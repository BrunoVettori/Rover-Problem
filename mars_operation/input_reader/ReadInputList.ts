import fs from 'fs';

function ReadInputList(path: string, file: string): string {
    const file_content = fs.readFileSync(`${path}/${file}`, 'utf8');
    return file_content;
}

export default ReadInputList;
