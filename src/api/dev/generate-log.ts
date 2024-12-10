import { readFileSync, readdirSync, statSync, writeFileSync, unlinkSync } from 'fs';
import { join, resolve, relative } from 'path';
import { fileURLToPath } from 'url';
import glob from 'glob';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Hergebruik de bestaande functies uit je script
function cleanupOldLogs() {
    const logPattern = resolve(__dirname, '../../../../file-log-*.txt');
    const oldLogs = glob.sync(logPattern);
    
    oldLogs.forEach(logFile => {
        try {
            unlinkSync(logFile);
        } catch (error) {
            console.error(`Kon log niet verwijderen: ${logFile}`, error);
        }
    });
}

function findFiles(dir: string, extension: string, fileList: string[] = []) {
    const files = readdirSync(dir);

    files.forEach(file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            findFiles(filePath, extension, fileList);
        } else if (file.endsWith(extension)) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

export async function POST(request: Request) {
    try {
        const { directory, fileType } = await request.json();

        // Verwijder oude logs
        cleanupOldLogs();

        // Bepaal zoekpad
        const rootDir = resolve(__dirname, '../../../../');
        const searchPath = resolve(rootDir, directory);

        // Zoek bestanden
        const files = findFiles(searchPath, fileType);

        if (files.length === 0) {
            return new Response(JSON.stringify({
                success: false,
                message: `Geen ${fileType} bestanden gevonden in de geselecteerde map.`
            }), {
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Genereer log inhoud
        let logContent = `=== Files Log (${fileType}) ===\n\n`;
        const timestamp = new Date().toISOString();
        logContent += `Gegenereerd op: ${timestamp}\n`;
        logContent += `Zoekmap: ${directory}\n`;
        logContent += `Bestandstype: ${fileType}\n`;
        logContent += `Aantal bestanden: ${files.length}\n\n`;

        files.forEach((filePath, index) => {
            const content = readFileSync(filePath, 'utf8');
            const relativePath = relative(rootDir, filePath);

            logContent += `\n=== File ${index + 1}/${files.length}: ${relativePath} ===\n\n`;
            logContent += content;
            logContent += '\n\n';
        });

        // Schrijf log bestand
        const folderName = directory.split('/').pop() || 'src';
        const sanitizedFileType = fileType.replace('.', '');
        const logFileName = `file-log-${folderName}-${sanitizedFileType}.txt`;
        const logPath = resolve(rootDir, logFileName);
        writeFileSync(logPath, logContent);

        return new Response(JSON.stringify({
            success: true,
            message: 'Log bestand succesvol gegenereerd',
            filesFound: files.length,
            logPath: logFileName
        }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Er is een fout opgetreden bij het genereren van de log.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 