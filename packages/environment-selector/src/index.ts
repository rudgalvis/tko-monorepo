import * as fs from 'fs';
import * as path from 'path';
import inquirer from 'inquirer';

const environments = ['development', 'production', 'staging'];
const monorepoRoot = path.resolve(__dirname, '../../..');

async function askForEnvironment(): Promise<string> {
    const questions = [
        {
            type: 'list',
            name: 'selectedEnv',
            message: 'Which environment would you like to set up?',
            choices: environments,
        },
    ];

    const answers = await inquirer.prompt(questions);
    return answers.selectedEnv;
}

async function switchEnvironment() {
    try {
        const selectedEnv = await askForEnvironment();

        const sourceEnvFile = `.env.${selectedEnv}`;
        const targetEnvFile = '.env';

        const sourcePath = path.join(monorepoRoot, sourceEnvFile);
        const targetPath = path.join(monorepoRoot, targetEnvFile);

        if (!fs.existsSync(sourcePath)) {
            console.error(
                `Error: Source environment file "${sourceEnvFile}" not found in project root (${monorepoRoot}).\nPlease ensure it exists.`
            );
            process.exit(1);
        }

        fs.copyFileSync(sourcePath, targetPath);
        console.log(
            `\nSuccessfully copied "${sourceEnvFile}" to "${targetEnvFile}" in the project root.`
        );
        console.log(`Active environment is now: ${selectedEnv}`);

    } catch (error) {
        // Type guard to check if error is an object and has the isTtyError property
        if (
            typeof error === 'object' &&
            error !== null &&
            'isTtyError' in error &&
            (error as { isTtyError?: boolean }).isTtyError // Type assertion after check
        ) {
            console.error(
                'Prompt rendering failed. Ensure you are running in a TTY environment.'
            );
        } else if (error instanceof Error) {
            console.error('An error occurred:', error.message);
        }
        else {
            console.error('An unexpected error occurred:', error);
        }
        process.exit(1);
    }
}

switchEnvironment();