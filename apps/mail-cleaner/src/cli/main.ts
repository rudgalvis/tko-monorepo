import { EmailCleaner } from '$lib/EmailCleaner';
import inquirer from 'inquirer';

interface CliAnswers {
	action: 'count' | 'archive' | 'delete' | 'archive-and-delete' | 'check-downloads' | 'remove-duplicates';
	beforeDate?: string;
	checkDate?: string;
	duplicateDate?: string;
	confirm?: boolean;
}

const DEFAULT_DATE = '01-Jan-2023'

async function main() {
	console.log('📧 Email Manager CLI');
	console.log('==================\n');

	const answers: CliAnswers = await inquirer.prompt([
		{
			type: 'list',
			name: 'action',
			message: 'What would you like to do?',
			choices: [
				{ name: '📊 Count emails before date', value: 'count' },
				{ name: '📦 Archive emails before date', value: 'archive' },
				{ name: '🗑️  Delete emails before date', value: 'delete' },
				{ name: '📦➡️🗑️  Archive then delete emails', value: 'archive-and-delete' },
				{ name: '📋 Check downloaded email archives', value: 'check-downloads' },
				{ name: '🧹 Remove duplicate email files', value: 'remove-duplicates' }
			]
		},
		{
			type: 'input',
			name: 'beforeDate',
			message: 'Enter the cutoff date (DD-MMM-YYYY):',
			default: DEFAULT_DATE,
			when: (answers) => answers.action !== 'check-downloads' && answers.action !== 'remove-duplicates',
			validate: (input: string) => {
				// Basic date format validation
				const dateRegex = /^\d{2}-\w{3}-\d{4}$/;
				if (!dateRegex.test(input)) {
					return 'Please enter date in format: DD-MMM-YYYY (e.g., 01-Jan-2023)';
				}
				return true;
			}
		},
		{
			type: 'input',
			name: 'checkDate',
			message: 'Enter the archive date to check (YYYY-MM-DD):',
			default: () => DEFAULT_DATE,
			when: (answers) => answers.action === 'check-downloads',
			validate: (input: string) => {
				// Basic date format validation
				const dateRegex = /^\d{2}-\w{3}-\d{4}$/;
				if (!dateRegex.test(input)) {
					return 'Please enter date in format: DD-MMM-YYYY (e.g., 01-Jan-2023)';
				}
				return true;
			}
		},
		{
			type: 'input',
			name: 'duplicateDate',
			message: 'Enter the archive date to clean duplicates (YYYY-MM-DD):',
			default: () => DEFAULT_DATE,
			when: (answers) => answers.action === 'remove-duplicates',
			validate: (input: string) => {
				// Basic date format validation
				const dateRegex = /^\d{2}-\w{3}-\d{4}$/;
				if (!dateRegex.test(input)) {
					return 'Please enter date in format: DD-MMM-YYYY (e.g., 01-Jan-2023)';
				}
				return true;
			}
		},
		{
			type: 'confirm',
			name: 'confirm',
			message: (answers) => {
				const actionText = {
					count: 'count',
					archive: 'archive',
					delete: 'DELETE',
					'archive-and-delete': 'ARCHIVE and DELETE'
				}[answers.action as keyof typeof actionText];

				return `Are you sure you want to ${actionText} emails before ${answers.beforeDate}?`;
			},
			when: (answers) => answers.action !== 'count' && answers.action !== 'check-downloads' && answers.action !== 'remove-duplicates'
		}
	]);

	if (answers.action !== 'count' && answers.action !== 'check-downloads' && answers.action !== 'remove-duplicates' && !answers.confirm) {
		console.log('❌ Operation cancelled');
		return;
	}

	const cleaner = new EmailCleaner();

	try {
		switch (answers.action) {
			case 'count':
				await cleaner.countEmailsBeforeDate(answers.beforeDate!);
				break;
			case 'archive':
				await cleaner.archiveEmailsBeforeDate(answers.beforeDate!);
				break;
			case 'delete':
				await cleaner.deleteEmailsBeforeDate(answers.beforeDate!);
				break;
			case 'archive-and-delete':
				// await cleaner.archiveAndDeleteEmailsBeforeDate(answers.beforeDate!);
				break;
			case 'check-downloads':
				await cleaner.checkDownloadedEmailsForDate(answers.checkDate!);
				break;
			case 'remove-duplicates':
				await handleRemoveDuplicates(cleaner, answers.duplicateDate!);
				break;
		}
	} catch (error) {
		console.error('❌ Operation failed:', error);
		process.exit(1);
	}
}

async function handleRemoveDuplicates(cleaner: EmailCleaner, targetDate: string): Promise<void> {
	console.log('\n🔍 Analyzing duplicate files...\n');

	// First, run a dry run to show what would be removed
	const dryRunResult = await cleaner.removeDuplicateEmails(targetDate, undefined, true);

	if (dryRunResult.filesRemoved === 0) {
		console.log('✅ No duplicate files found. Your archive is already clean!');
		return;
	}

	console.log('\n📊 Duplicate Analysis Summary:');
	console.log(`   🔄 Total duplicate files found: ${dryRunResult.filesRemoved}`);
	console.log(`   💾 Space that would be freed: ${formatBytes(dryRunResult.spaceFreed)}`);
	console.log('\n📁 Breakdown by mailbox:');

	for (const [mailbox, stats] of Object.entries(dryRunResult.byMailbox)) {
		if (stats.removed > 0) {
			console.log(`   ${mailbox}: ${stats.removed} duplicates (${formatBytes(stats.spaceFreed)})`);
		}
	}

	console.log('\n⚠️  Note: This will keep the oldest file for each email UID and remove newer duplicates.');

	// Ask for confirmation
	const confirmResult = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'proceed',
			message: `Do you want to proceed with removing ${dryRunResult.filesRemoved} duplicate files?`,
			default: false
		}
	]);

	if (!confirmResult.proceed) {
		console.log('❌ Duplicate removal cancelled');
		return;
	}

	console.log('\n🧹 Removing duplicate files...\n');

	// Actually remove the duplicates
	const actualResult = await cleaner.removeDuplicateEmails(targetDate, undefined, false);

	console.log('\n✅ Duplicate removal completed!');
	console.log(`   🗑️  Files removed: ${actualResult.filesRemoved}`);
	console.log(`   💾 Space freed: ${formatBytes(actualResult.spaceFreed)}`);

	if (actualResult.filesRemoved !== dryRunResult.filesRemoved) {
		console.log(`   ⚠️  Note: Some files may not have been removed due to errors`);
	}
}

function formatBytes(bytes: number): string {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

main().catch(console.error);