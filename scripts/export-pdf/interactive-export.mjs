import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import ora from 'ora';
import { fileURLToPath } from 'url';

// Handling __dirname in ES modules (if package.json is type: module, otherwise convert to require)
// Since we used 'npm init -y', it's CJS by default. But inquirer v9+ is ESM only.
// Let's assume user might not have set type:module in package.json.
// However, the previous `generate-pdf.js` was CJS (require).
// If we install latest inquirer, it requires ESM.
// To play it safe with common setups, we'll write this dynamic or assume CJS if we use an older version, 
// OR we just use standard ESM imports if local node setup supports it (Node 22 does).
// But for mixing, let's just use dynamic import or update package.json. 
// Easier path: Rename this file to .mjs or update package.json type.
// Let's check `package.json` content first? No, let's just write as .mjs to force ESM mode which is cleaner for modern CLI tools.

// Wait, the previous file `generate-pdf.js` used `require`.
// If I make this `.mjs`, I can import `inquirer`.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
    console.log(chalk.bold.blue('\n📄 Presentation PDF Exporter\n'));

    // 1. Scan for HTML files
    const files = fs.readdirSync(process.cwd())
        .filter(file => file.endsWith('.html'));

    if (files.length === 0) {
        console.log(chalk.red('❌ No .html files found in the current directory.'));
        process.exit(1);
    }

    console.log(chalk.blue(`Found ${files.length} HTML files.`));

    // 2. prompt user

    // Optimization: If only one file, confirm and proceed
    if (files.length === 1) {
        const file = files[0];
        const answers = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'proceed',
                message: `Found only 1 file: ${chalk.cyan(file)}. Convert it?`,
                default: true
            }
        ]);

        if (!answers.proceed) {
            console.log(chalk.yellow('Operation cancelled.'));
            return;
        }

        // Execute directly
        const selectedFile = file;
        await generatePdf(selectedFile);
        return;
    }

    // Multiple files: Show list
    // Use rawlist which is often more compatible with different terminals
    const choices = files.map(file => {
        return {
            name: file,
            value: file
        };
    });

    console.log(chalk.gray('Files found:', files.join(', ')));

    try {
        const answer = await inquirer.prompt([
            {
                type: 'rawlist',
                name: 'filename',
                message: 'Select a presentation file (type number):',
                choices: choices,
                pageSize: 10
            }
        ]);

        const selectedFile = answer.filename;
        await generatePdf(selectedFile);
    } catch (error) {
        if (error.isTtyError) {
            console.log(chalk.red("Prompt couldn't be rendered in the current environment"));
        } else {
            console.log(chalk.red("Exit: ", error.message));
        }
    }
}

async function generatePdf(selectedFile) {
    if (!selectedFile) {
        console.log(chalk.yellow('No file selected.'));
        return;
    }

    // 3. Execute generation
    const spinner = ora(`Generating PDF for ${chalk.bold(selectedFile)}...`).start();

    const scriptPath = path.join(__dirname, 'generate-pdf.js');

    exec(`node "${scriptPath}" "${selectedFile}"`, (error, stdout, stderr) => {
        if (error) {
            spinner.fail(chalk.red('Conversion Failed!'));
            console.error(chalk.red(stderr));
            return;
        }

        spinner.succeed(chalk.green('Conversion Complete!'));
        console.log(chalk.dim(stdout)); // Show original script output if any

        const pdfFile = selectedFile.replace('.html', '.pdf');
        console.log(chalk.bold.green(`\n✨ Exported: ${pdfFile}\n`));
    });
}

// remove the extra run call at the end if I am defining generatePdf outside
// Actually I need to close the run function appropriately.
// logic below wraps the end of run() and adds generatePdf function.
/* 
   We are replacing from line 40 to 62.
   But we need to handle the rest of the file which contains the old execution logic.
   So I will replace from line 40 to the END of the 'run' function to restructure it.
*/



run();
