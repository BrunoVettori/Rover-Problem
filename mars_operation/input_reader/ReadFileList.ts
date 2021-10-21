import fs from 'fs';

function ReadFileList(path: string): Array<string> {
    return fs.readdirSync(path);
}

export default ReadFileList;
