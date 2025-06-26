import { PUBLIC_EMAIL_PASSWORD, PUBLIC_IMAP_HOST, PUBLIC_IMAP_PORT, PUBLIC_IMAP_SECURE, PUBLIC_IMAP_USERNAME } from '$env/static/public';
import type { EmailConfig } from '$lib/EmailConfig';
import Imap from 'imap';
import fs from 'fs';
import path from 'path';


export class EmailCleaner {
	private imap: Imap;
	private config: EmailConfig;

	constructor() {
		this.config = {
			user: PUBLIC_IMAP_USERNAME!,
			password: PUBLIC_EMAIL_PASSWORD!,
			host: PUBLIC_IMAP_HOST!,
			port: parseInt(PUBLIC_IMAP_PORT!),
			tls: PUBLIC_IMAP_SECURE === 'true',
			tlsOptions: {
				rejectUnauthorized: false
			}
		};

		this.imap = new Imap(this.config);
	}

	private async connectToImap(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.imap.once('ready', () => {
				console.log('✅ Connected to IMAP server');
				resolve();
			});

			this.imap.once('error', (err: Error) => {
				console.error('❌ IMAP connection error:', err);
				reject(err);
			});

			this.imap.connect();
		});
	}

	private async openMailbox(boxName: string = 'INBOX'): Promise<void> {
		return new Promise((resolve, reject) => {
			this.imap.openBox(boxName, false, (err, box) => {
				if (err) {
					reject(err);
					return;
				}
				console.log(`📬 Opened mailbox: ${boxName} (${box.messages.total} messages)`);
				resolve();
			});
		});
	}

	private async searchEmailsBeforeDate(beforeDate: string): Promise<number[]> {
		return new Promise((resolve, reject) => {
			// Search for emails before the specified date
			const searchCriteria = [['BEFORE', beforeDate]];

			this.imap.search(searchCriteria, (err, uids) => {
				if (err) {
					reject(err);
					return;
				}

				console.log(`🔍 Found ${uids.length} emails before ${beforeDate}`);
				resolve(uids);
			});
		});
	}

	private async deleteEmails(uids: number[]): Promise<void> {
		if (uids.length === 0) {
			console.log('ℹ️ No emails to delete');
			return;
		}

		// Process in batches to avoid "Too long argument" error
		const batchSize = 1000; // Adjust this number based on your server's limits
		const batches = [];

		for (let i = 0; i < uids.length; i += batchSize) {
			batches.push(uids.slice(i, i + batchSize));
		}

		console.log(`🗑️ Processing ${uids.length} emails in ${batches.length} batches of ${batchSize}`);

		for (let i = 0; i < batches.length; i++) {
			const batch = batches[i];
			console.log(`📦 Processing batch ${i + 1}/${batches.length} (${batch.length} emails)`);

			try {
				await this.deleteBatch(batch);

				// Small delay between batches to be nice to the server
				if (i < batches.length - 1) {
					await new Promise(resolve => setTimeout(resolve, 100));
				}
			} catch (error) {
				console.error(`❌ Error processing batch ${i + 1}:`, error);
				// Continue with next batch instead of failing completely
			}
		}

		console.log(`✅ Finished processing all batches`);
	}

	private async deleteBatch(uids: number[]): Promise<void> {
		return new Promise((resolve, reject) => {
			// Mark emails for deletion
			this.imap.addFlags(uids, ['\\Deleted'], (err) => {
				if (err) {
					reject(err);
					return;
				}

				console.log(`🗑️ Marked ${uids.length} emails for deletion`);

				// Expunge (permanently delete) marked emails
				this.imap.expunge((expungeErr) => {
					if (expungeErr) {
						reject(expungeErr);
						return;
					}

					console.log(`✅ Successfully deleted ${uids.length} emails`);
					resolve();
				});
			});
		});
	}


	private async processMailbox(boxName: string, beforeDate: string): Promise<void> {
		try {
			await this.openMailbox(boxName);
			const uids = await this.searchEmailsBeforeDate(beforeDate);

			if (uids.length > 0) {
				console.log(`⚠️ About to delete ${uids.length} emails from ${boxName}`);
				console.log('Waiting 5 seconds... Press Ctrl+C to cancel');

				await new Promise(resolve => setTimeout(resolve, 5000));

				await this.deleteEmails(uids);
			}
		} catch (error) {
			console.error(`❌ Error processing ${boxName}:`, error);
		}
	}

	public async deleteEmailsBeforeDate(beforeDate: string = '01-Jan-2023'): Promise<void> {
		try {
			await this.connectToImap();

			// List all mailboxes
			const boxes = await this.listMailboxes();
			console.log('📁 Available mailboxes:', Object.keys(boxes));

			// Process main mailboxes
			const mailboxesToProcess = ['INBOX', 'Sent', 'Drafts', 'Trash'];

			for (const boxName of mailboxesToProcess) {
				console.log(`\n📂 Processing ${boxName}...`);
				await this.processMailbox(boxName, beforeDate);
			}

		} catch (error) {
			console.error('❌ Error:', error);
		} finally {
			this.imap.end();
			console.log('👋 Disconnected from IMAP server');
		}
	}

	private async listMailboxes(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.imap.getBoxes((err, boxes) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(boxes);
			});
		});
	}

	private async downloadEmail(uid: number): Promise<string> {
		return new Promise((resolve, reject) => {
			const fetch = this.imap.fetch(uid, { bodies: '' });
			let emailContent = '';

			fetch.on('message', (msg) => {
				msg.on('body', (stream) => {
					stream.on('data', (chunk) => {
						emailContent += chunk.toString();
					});
				});

				msg.once('end', () => {
					resolve(emailContent);
				});
			});

			fetch.once('error', (err) => {
				reject(err);
			});

			fetch.once('end', () => {
				if (!emailContent) {
					reject(new Error('No email content received'));
				}
			});
		});
	}

	private async downloadEmails(uids: number[], boxName: string, archiveDate: string): Promise<void> {
		if (uids.length === 0) {
			console.log('ℹ️ No emails to download');
			return;
		}

		// Create archive directory using a meaningful date
		const archiveDir = path.join(process.cwd(), `email-archive-${archiveDate}`, boxName);
		if (!fs.existsSync(archiveDir)) {
			fs.mkdirSync(archiveDir, { recursive: true });
		}

		// Get already downloaded UIDs to skip them
		const downloadedUIDs = this.getDownloadedEmailUIDs(archiveDate, boxName);
		const downloadedUIDsSet = new Set(downloadedUIDs);

		// Filter out UIDs that have already been downloaded
		const uidsToDownload = uids.filter(uid => !downloadedUIDsSet.has(uid));
		const skippedCount = uids.length - uidsToDownload.length;

		if (skippedCount > 0) {
			console.log(`⏭️ Skipping ${skippedCount} already downloaded emails`);
		}

		if (uidsToDownload.length === 0) {
			console.log('✅ All emails for this selection have already been downloaded');
			return;
		}

		console.log(`📥 Starting download of ${uids.length} emails from ${boxName}...`);

		let successCount = 0;
		let errorCount = 0;

		for (let i = 0; i < uidsToDownload.length; i++) {
			const uid = uidsToDownload[i];
			try {
				console.log(`📧 Downloading email ${i + 1}/${uidsToDownload.length} (UID: ${uid})`);

				const emailContent = await this.downloadEmail(uid);
				const filename = `email_${uid}_${Date.now()}.eml`;
				const filepath = path.join(archiveDir, filename);

				fs.writeFileSync(filepath, emailContent);
				console.log(`✅ Saved: ${filename}`);
				successCount++;

				// Small delay to avoid overwhelming the server
				await new Promise(resolve => setTimeout(resolve, 100));
			} catch (error) {
				console.error(`❌ Error downloading email UID ${uid}:`, error);
				errorCount++;
			}
		}

		console.log(`🎉 Download complete for ${boxName}:`);
		console.log(`   ✅ Successfully downloaded: ${successCount}`);
		console.log(`   ⏭️ Skipped (already downloaded): ${skippedCount}`);
		if (errorCount > 0) {
			console.log(`   ❌ Failed downloads: ${errorCount}`);
		}
		console.log(`   📁 Location: ${archiveDir}`);
	}

	/**
	 * Check how many unique emails have been downloaded for a specific date and mailbox
	 * @param targetDate - The date to check (YYYY-MM-DD format)
	 * @param boxName - The mailbox name (optional, defaults to all mailboxes)
	 * @returns Object with unique count information
	 */
	public async checkDownloadedEmailsForDate(
		targetDate: string,
		boxName?: string
	): Promise<{ totalUnique: number; byMailbox: Record<string, number>; duplicates?: Record<string, number> }> {
		try {
			const archiveDir = path.join(process.cwd(), `email-archive-${targetDate}`);

			// Check if archive directory exists
			if (!fs.existsSync(archiveDir)) {
				console.log(`📂 No archive directory found for date: ${targetDate}`);
				return { totalUnique: 0, byMailbox: {} };
			}

			const byMailbox: Record<string, number> = {};
			const duplicatesByMailbox: Record<string, number> = {};
			const allUniqueUIDs = new Set<number>();
			let totalFiles = 0;

			if (boxName) {
				// Check specific mailbox
				const mailboxDir = path.join(archiveDir, boxName);
				if (fs.existsSync(mailboxDir)) {
					const { uniqueCount, totalCount, duplicateCount } = this.countUniqueUIDsInDirectory(mailboxDir);
					byMailbox[boxName] = uniqueCount;
					duplicatesByMailbox[boxName] = duplicateCount;
					totalFiles += totalCount;

					console.log(`📊 Found ${uniqueCount} unique email UIDs in ${boxName} for ${targetDate}`);
					if (duplicateCount > 0) {
						console.log(`⚠️  Found ${duplicateCount} duplicate files in ${boxName}`);
					}
				} else {
					console.log(`📂 No ${boxName} directory found for date: ${targetDate}`);
					byMailbox[boxName] = 0;
					duplicatesByMailbox[boxName] = 0;
				}
			} else {
				// Check all mailboxes
				const mailboxDirs = fs.readdirSync(archiveDir, { withFileTypes: true })
					.filter(dirent => dirent.isDirectory())
					.map(dirent => dirent.name);

				for (const mailbox of mailboxDirs) {
					const mailboxDir = path.join(archiveDir, mailbox);
					const { uniqueCount, totalCount, duplicateCount, uniqueUIDs } = this.countUniqueUIDsInDirectory(mailboxDir);

					byMailbox[mailbox] = uniqueCount;
					duplicatesByMailbox[mailbox] = duplicateCount;
					totalFiles += totalCount;

					// Add to global unique UIDs set
					uniqueUIDs.forEach(uid => allUniqueUIDs.add(uid));

					console.log(`📊 Found ${uniqueCount} unique email UIDs in ${mailbox}`);
					if (duplicateCount > 0) {
						console.log(`⚠️  Found ${duplicateCount} duplicate files in ${mailbox}`);
					}
				}

				const totalDuplicates = Object.values(duplicatesByMailbox).reduce((sum, count) => sum + count, 0);

				console.log(`📈 Summary for ${targetDate}:`);
				console.log(`   🔢 Total unique email UIDs: ${allUniqueUIDs.size}`);
				console.log(`   📁 Total files: ${totalFiles}`);
				if (totalDuplicates > 0) {
					console.log(`   🔄 Total duplicate files: ${totalDuplicates}`);
					console.log(`   💾 Storage efficiency: ${((allUniqueUIDs.size / totalFiles) * 100).toFixed(1)}%`);
				}
			}

			return {
				totalUnique: boxName ? byMailbox[boxName] : allUniqueUIDs.size,
				byMailbox,
				duplicates: duplicatesByMailbox
			};

		} catch (error) {
			console.error('❌ Error checking downloaded emails:', error);
			return { totalUnique: 0, byMailbox: {} };
		}
	}

	/**
	 * Helper method to count unique UIDs in a directory
	 * @param directoryPath - Path to the directory to check
	 * @returns Object with unique count, total count, and duplicate count
	 */
	private countUniqueUIDsInDirectory(directoryPath: string): {
		uniqueCount: number;
		totalCount: number;
		duplicateCount: number;
		uniqueUIDs: Set<number>;
	} {
		const files = fs.readdirSync(directoryPath);
		const emailFiles = files.filter(file => file.endsWith('.eml'));

		const uidCounts = new Map<number, number>();
		const uniqueUIDs = new Set<number>();

		// Count occurrences of each UID
		for (const file of emailFiles) {
			const match = file.match(/^email_(\d+)_\d+\.eml$/);
			if (match) {
				const uid = parseInt(match[1]);
				uniqueUIDs.add(uid);
				uidCounts.set(uid, (uidCounts.get(uid) || 0) + 1);
			}
		}

		// Count duplicates
		let duplicateCount = 0;
		for (const [uid, count] of uidCounts) {
			if (count > 1) {
				duplicateCount += count - 1; // All but one are duplicates
			}
		}

		return {
			uniqueCount: uniqueUIDs.size,
			totalCount: emailFiles.length,
			duplicateCount,
			uniqueUIDs
		};
	}

	/**
	 * Get the list of UIDs that have already been downloaded for a specific date and mailbox
	 * @param targetDate - The date to check (YYYY-MM-DD format)
	 * @param boxName - The mailbox name
	 * @returns Array of UIDs that have been downloaded
	 */
	public getDownloadedEmailUIDs(targetDate: string, boxName: string): number[] {
		try {
			const archiveDir = path.join(process.cwd(), `email-archive-${targetDate}`, boxName);

			if (!fs.existsSync(archiveDir)) {
				return [];
			}

			const files = fs.readdirSync(archiveDir);
			const emailFiles = files.filter(file => file.endsWith('.eml'));

			// Extract UIDs from filename pattern: email_${uid}_${timestamp}.eml
			const uids: number[] = [];
			for (const file of emailFiles) {
				const match = file.match(/^email_(\d+)_\d+\.eml$/);
				if (match) {
					uids.push(parseInt(match[1]));
				}
			}

			console.log(`📋 Found ${uids.length} downloaded email UIDs in ${boxName} for ${targetDate}`);
			return uids.sort((a, b) => a - b); // Sort UIDs numerically

		} catch (error) {
			console.error('❌ Error getting downloaded UIDs:', error);
			return [];
		}
	}

	/**
	 * Remove duplicate email files, keeping only the oldest file for each UID
	 * @param targetDate - The date to check (YYYY-MM-DD format)
	 * @param boxName - The mailbox name (optional, defaults to all mailboxes)
	 * @param dryRun - If true, only shows what would be deleted without actually deleting
	 * @returns Object with cleanup results
	 */
	public async removeDuplicateEmails(
		targetDate: string,
		boxName?: string,
		dryRun: boolean = false
	): Promise<{
		filesRemoved: number;
		spaceFreed: number;
		byMailbox: Record<string, { removed: number; spaceFreed: number }>;
	}> {
		try {
			const archiveDir = path.join(process.cwd(), `email-archive-${targetDate}`);

			// Check if archive directory exists
			if (!fs.existsSync(archiveDir)) {
				console.log(`📂 No archive directory found for date: ${targetDate}`);
				return { filesRemoved: 0, spaceFreed: 0, byMailbox: {} };
			}

			const byMailbox: Record<string, { removed: number; spaceFreed: number }> = {};
			let totalFilesRemoved = 0;
			let totalSpaceFreed = 0;

			if (boxName) {
				// Process specific mailbox
				const mailboxDir = path.join(archiveDir, boxName);
				if (fs.existsSync(mailboxDir)) {
					const result = await this.removeDuplicatesInDirectory(mailboxDir, boxName, dryRun);
					byMailbox[boxName] = result;
					totalFilesRemoved += result.removed;
					totalSpaceFreed += result.spaceFreed;
				} else {
					console.log(`📂 No ${boxName} directory found for date: ${targetDate}`);
					byMailbox[boxName] = { removed: 0, spaceFreed: 0 };
				}
			} else {
				// Process all mailboxes
				const mailboxDirs = fs.readdirSync(archiveDir, { withFileTypes: true })
					.filter(dirent => dirent.isDirectory())
					.map(dirent => dirent.name);

				for (const mailbox of mailboxDirs) {
					const mailboxDir = path.join(archiveDir, mailbox);
					const result = await this.removeDuplicatesInDirectory(mailboxDir, mailbox, dryRun);
					byMailbox[mailbox] = result;
					totalFilesRemoved += result.removed;
					totalSpaceFreed += result.spaceFreed;
				}

				console.log(`\n🧹 ${dryRun ? 'Would remove' : 'Removed'} duplicates for ${targetDate}:`);
				console.log(`   🗑️  Total files ${dryRun ? 'to remove' : 'removed'}: ${totalFilesRemoved}`);
				console.log(`   💾 Total space ${dryRun ? 'to free' : 'freed'}: ${this.formatBytes(totalSpaceFreed)}`);
			}

			return {
				filesRemoved: totalFilesRemoved,
				spaceFreed: totalSpaceFreed,
				byMailbox
			};

		} catch (error) {
			console.error('❌ Error removing duplicate emails:', error);
			return { filesRemoved: 0, spaceFreed: 0, byMailbox: {} };
		}
	}

	/**
	 * Remove duplicates in a specific directory
	 * @param directoryPath - Path to the directory to clean
	 * @param mailboxName - Name of the mailbox for logging
	 * @param dryRun - If true, only shows what would be deleted
	 * @returns Object with removal results
	 */
	private async removeDuplicatesInDirectory(
		directoryPath: string,
		mailboxName: string,
		dryRun: boolean
	): Promise<{ removed: number; spaceFreed: number }> {
		const files = fs.readdirSync(directoryPath);
		const emailFiles = files.filter(file => file.endsWith('.eml'));

		// Group files by UID
		const filesByUID = new Map<number, Array<{ filename: string; timestamp: number; size: number }>>();

		for (const file of emailFiles) {
			const match = file.match(/^email_(\d+)_(\d+)\.eml$/);
			if (match) {
				const uid = parseInt(match[1]);
				const timestamp = parseInt(match[2]);
				const filepath = path.join(directoryPath, file);
				const stats = fs.statSync(filepath);

				if (!filesByUID.has(uid)) {
					filesByUID.set(uid, []);
				}

				filesByUID.get(uid)!.push({
					filename: file,
					timestamp,
					size: stats.size
				});
			}
		}

		let removedCount = 0;
		let spaceFreed = 0;
		const filesToRemove: string[] = [];

		// Find duplicates (keep the oldest file for each UID)
		for (const [uid, uidFiles] of filesByUID) {
			if (uidFiles.length > 1) {
				// Sort by timestamp (oldest first)
				uidFiles.sort((a, b) => a.timestamp - b.timestamp);

				// Mark all but the first (oldest) for removal
				const duplicates = uidFiles.slice(1);

				for (const duplicate of duplicates) {
					filesToRemove.push(duplicate.filename);
					spaceFreed += duplicate.size;
					removedCount++;
				}

				if (dryRun) {
					console.log(`🔍 UID ${uid} in ${mailboxName}: Found ${uidFiles.length} copies, would remove ${duplicates.length}`);
					duplicates.forEach(dup => {
						console.log(`   🗑️  Would remove: ${dup.filename} (${this.formatBytes(dup.size)})`);
					});
				} else {
					console.log(`🧹 UID ${uid} in ${mailboxName}: Removing ${duplicates.length} duplicate(s)`);
				}
			}
		}

		// Actually remove files if not a dry run
		if (!dryRun && filesToRemove.length > 0) {
			for (const filename of filesToRemove) {
				try {
					const filepath = path.join(directoryPath, filename);
					fs.unlinkSync(filepath);
					console.log(`✅ Removed: ${filename}`);
				} catch (error) {
					console.error(`❌ Error removing ${filename}:`, error);
					removedCount--; // Decrease count if removal failed
				}
			}
		}

		if (dryRun) {
			console.log(`📊 ${mailboxName}: Would remove ${removedCount} duplicates (${this.formatBytes(spaceFreed)})`);
		} else {
			console.log(`📊 ${mailboxName}: Removed ${removedCount} duplicates (${this.formatBytes(spaceFreed)} freed)`);
		}

		return { removed: removedCount, spaceFreed };
	}

	/**
	 * Format bytes into human readable format
	 * @param bytes - Number of bytes
	 * @returns Formatted string
	 */
	private formatBytes(bytes: number): string {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	/**
	 * Get detailed duplicate analysis for a specific date
	 * @param targetDate - The date to analyze (YYYY-MM-DD format)
	 * @returns Detailed duplicate information
	 */
	public async analyzeDuplicates(targetDate: string): Promise<{
		totalDuplicates: number;
		potentialSpaceSavings: number;
		duplicatesByMailbox: Record<string, Array<{
			uid: number;
			copies: number;
			totalSize: number;
			wouldSave: number;
		}>>;
	}> {
		try {
			const archiveDir = path.join(process.cwd(), `email-archive-${targetDate}`);

			if (!fs.existsSync(archiveDir)) {
				console.log(`📂 No archive directory found for date: ${targetDate}`);
				return { totalDuplicates: 0, potentialSpaceSavings: 0, duplicatesByMailbox: {} };
			}

			const mailboxDirs = fs.readdirSync(archiveDir, { withFileTypes: true })
				.filter(dirent => dirent.isDirectory())
				.map(dirent => dirent.name);

			const duplicatesByMailbox: Record<string, Array<{
				uid: number;
				copies: number;
				totalSize: number;
				wouldSave: number;
			}>> = {};

			let totalDuplicates = 0;
			let potentialSpaceSavings = 0;

			for (const mailbox of mailboxDirs) {
				const mailboxDir = path.join(archiveDir, mailbox);
				const analysis = this.analyzeDuplicatesInDirectory(mailboxDir);

				duplicatesByMailbox[mailbox] = analysis.duplicates;
				totalDuplicates += analysis.totalDuplicateFiles;
				potentialSpaceSavings += analysis.potentialSavings;

				if (analysis.duplicates.length > 0) {
					console.log(`\n📋 Duplicate analysis for ${mailbox}:`);
					analysis.duplicates.forEach(dup => {
						console.log(`   UID ${dup.uid}: ${dup.copies} copies, could save ${this.formatBytes(dup.wouldSave)}`);
					});
				}
			}

			console.log(`\n📈 Overall duplicate analysis for ${targetDate}:`);
			console.log(`   🔄 Total duplicate files: ${totalDuplicates}`);
			console.log(`   💾 Potential space savings: ${this.formatBytes(potentialSpaceSavings)}`);

			return {
				totalDuplicates,
				potentialSpaceSavings,
				duplicatesByMailbox
			};

		} catch (error) {
			console.error('❌ Error analyzing duplicates:', error);
			return { totalDuplicates: 0, potentialSpaceSavings: 0, duplicatesByMailbox: {} };
		}
	}

	/**
	 * Analyze duplicates in a specific directory
	 * @param directoryPath - Path to analyze
	 * @returns Duplicate analysis results
	 */
	private analyzeDuplicatesInDirectory(directoryPath: string): {
		duplicates: Array<{
			uid: number;
			copies: number;
			totalSize: number;
			wouldSave: number;
		}>;
		totalDuplicateFiles: number;
		potentialSavings: number;
	} {
		const files = fs.readdirSync(directoryPath);
		const emailFiles = files.filter(file => file.endsWith('.eml'));

		const filesByUID = new Map<number, Array<{ filename: string; size: number }>>();

		for (const file of emailFiles) {
			const match = file.match(/^email_(\d+)_\d+\.eml$/);
			if (match) {
				const uid = parseInt(match[1]);
				const filepath = path.join(directoryPath, file);
				const stats = fs.statSync(filepath);

				if (!filesByUID.has(uid)) {
					filesByUID.set(uid, []);
				}

				filesByUID.get(uid)!.push({
					filename: file,
					size: stats.size
				});
			}
		}

		const duplicates: Array<{
			uid: number;
			copies: number;
			totalSize: number;
			wouldSave: number;
		}> = [];

		let totalDuplicateFiles = 0;
		let potentialSavings = 0;

		for (const [uid, uidFiles] of filesByUID) {
			if (uidFiles.length > 1) {
				const totalSize = uidFiles.reduce((sum, file) => sum + file.size, 0);
				const largestFile = Math.max(...uidFiles.map(f => f.size));
				const wouldSave = totalSize - largestFile; // Keep the largest file

				duplicates.push({
					uid,
					copies: uidFiles.length,
					totalSize,
					wouldSave
				});

				totalDuplicateFiles += uidFiles.length - 1; // All but one are duplicates
				potentialSavings += wouldSave;
			}
		}

		return {
			duplicates,
			totalDuplicateFiles,
			potentialSavings
		};
	}

	private async archiveMailbox(boxName: string, beforeDate: string): Promise<void> {
		try {
			await this.openMailbox(boxName);
			const uids = await this.searchEmailsBeforeDate(beforeDate);

			if (uids.length > 0) {
				console.log(`📦 About to archive ${uids.length} emails from ${boxName}`);
				await this.downloadEmails(uids, boxName, beforeDate);
			}
		} catch (error) {
			console.error(`❌ Error archiving ${boxName}:`, error);
		}
	}

	public async archiveEmailsBeforeDate(beforeDate: string = '01-Jan-2023'): Promise<void> {
		try {
			await this.connectToImap();

			// List all mailboxes
			const boxes = await this.listMailboxes();
			console.log('📁 Available mailboxes:', Object.keys(boxes));

			// Process main mailboxes
			const mailboxesToProcess = ['INBOX', 'Sent', 'Drafts', 'Trash'];

			for (const boxName of mailboxesToProcess) {
				console.log(`\n📂 Archiving ${boxName}...`);
				await this.archiveMailbox(boxName, beforeDate);
			}

		} catch (error) {
			console.error('❌ Error:', error);
		} finally {
			this.imap.end();
			console.log('👋 Disconnected from IMAP server');
		}
	}

	// Dry run - just count emails without deleting
	public async countEmailsBeforeDate(beforeDate: string = '01-Jan-2023'): Promise<void> {
		try {
			await this.connectToImap();
			await this.openMailbox('INBOX');

			const uids = await this.searchEmailsBeforeDate(beforeDate);
			console.log(`📊 Total emails before ${beforeDate}: ${uids.length}`);

		} catch (error) {
			console.error('❌ Error:', error);
		} finally {
			this.imap.end();
		}
	}
}
