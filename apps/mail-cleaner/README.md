# Mail Cleaner App

A comprehensive command-line email management tool built with TypeScript that provides powerful IMAP-based email operations including archiving, deletion, and duplicate management.

## 📧 Overview

The Mail Cleaner app is designed to help users efficiently manage their email accounts by providing tools to:
- Archive emails before a specific date
- Delete old emails in bulk
- Check downloaded email archives
- Remove duplicate email files
- Count emails for analysis

The application connects to your email server via IMAP and processes emails across multiple mailboxes (INBOX, Sent, Drafts, Trash).

## ✨ Features

### 📊 Email Analysis
- **Count emails** before a specified date
- **Check downloaded archives** to verify backup completeness
- **Analyze duplicates** with detailed storage impact reports

### 📦 Email Archiving
- Download emails as `.eml` files before deletion
- Organized directory structure by date and mailbox
- Skip already downloaded emails to avoid duplicates
- Resume interrupted downloads automatically

### 🗑️ Email Deletion
- Bulk delete emails before a specified date
- Process emails in configurable batches to avoid server limits
- 5-second safety delay with cancellation option
- Support for multiple mailboxes

### 🧹 Duplicate Management
- Identify and remove duplicate email files
- Keep the oldest file for each unique email (by UID)
- Dry-run mode to preview changes before execution
- Detailed space savings analysis

## 🔧 Usage

Run the application using:

```bash
pnpm start
```

The interactive CLI will present you with the following options:

### 📊 Count emails before date
Get a count of emails older than a specified date without making any changes.

### 📦 Archive emails before date
Download emails as `.eml` files to local storage, organized by mailbox and date.

### 🗑️ Delete emails before date
Permanently delete emails older than the specified date (with confirmation).

### 📦➡️🗑️ Archive then delete emails
*Currently in development* - Will archive emails first, then delete them from the server.

### 📋 Check downloaded email archives
Verify your local email archives and get statistics on downloaded emails.

### 🧹 Remove duplicate email files
Clean up duplicate files in your local archives, with detailed analysis and confirmation.

## 📁 Archive Structure

Downloaded emails are organized as follows:

```
email-archive-DD-MMM-YYYY/
├── INBOX/
│   ├── email_12345_1640995200000.eml
│   └── email_12346_1640995300000.eml
├── Sent/
├── Drafts/
└── Trash/
```


## ⚠️ Safety Features

- **Confirmation prompts** for destructive operations
- **5-second delay** before deletion with option to cancel
- **Batch processing** to prevent server timeouts
- **Dry-run mode** for duplicate removal
- **Resume capability** for interrupted downloads

## 🔒 Security

- Uses secure IMAP connections (TLS)
- Supports app-specific passwords
- No credentials stored in code
- Environment variable configuration

## 📝 Date Format

The application uses `DD-MMM-YYYY` format for dates (e.g., `01-Jan-2023`).

## 🛠️ Technical Details

- **Built with**: TypeScript, Node.js
- **Email Protocol**: IMAP
- **CLI Framework**: Inquirer.js
- **File System**: Native Node.js fs module
- **Architecture**: Object-oriented with async/await patterns

## 📋 Requirements

- Node.js 16+
- IMAP-enabled email account
- App-specific password (recommended for Gmail)
- Network access to your email server

## 🤝 Contributing

This is a private utility package. For feature requests or bug reports, please contact the maintainer.

## ⚖️ License

Private - Not for redistribution

---

**⚠️ Important**: Always test with a small date range first. Email deletion is permanent and cannot be undone. Consider archiving emails before deletion as a safety measure.