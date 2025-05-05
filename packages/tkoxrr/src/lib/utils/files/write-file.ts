import fs from 'fs'
import path from 'path'

export const writeFile = (dirPath: string, fileName: string, data: string) => {
    // Ensure directory exists
    fs.mkdirSync(dirPath, { recursive: true })

    // Write the file
    fs.writeFileSync(path.join(dirPath, fileName), JSON.stringify(data))
}