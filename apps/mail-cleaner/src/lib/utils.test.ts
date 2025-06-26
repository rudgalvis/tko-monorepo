import { EmailCleaner } from '$lib/EmailCleaner';
import {test} from 'vitest'

test('test', async () => {
	const cleaner = new EmailCleaner();

	// First, do a dry run to see how many emails will be deleted
	console.log('🔍 Performing dry run...');
	await cleaner.removeDuplicateEmails('01-Jan-2023', undefined, true);

//	await cleaner.checkDownloadedEmailsForDate('01-Jan-2023');

//	console.log('\n⚠️ CAUTION: This will permanently delete emails!');
//	console.log('Make sure you have backups before proceeding.');

	// Uncomment the line below to actually delete emails
	// await cleaner.deleteEmailsBeforeDate('01-Jan-2023');
})