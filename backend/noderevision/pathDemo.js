import path from 'path';
import url from 'url';

const filePath = './dir1/dir2/text.txt';

//basename()
console.log(path.basename(filePath));

//dirname()
console.log(path.dirname(filePath));

//extname()
console.log(path.extname(filePath));

//parse()
console.log(path.parse(filePath));

//filename
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename,'\n',__dirname);


//join()
const filePath2 = path.join(__dirname,'dir1','dir2','test.txt');
console.log(filePath2);

//resolve() : Similar to join but always returns absolute path and treats / as root; Convert segments into an absolute path
const filePath3 = path.resolve(__dirname,'dir1','dir2','test.txt');
console.log(filePath3);