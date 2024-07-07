import fs from 'fs'; 
import zlib from 'zlib'; 
import { pipeline } from 'stream/promises';

// 壓縮檔案的函數
async function compressFile(inputPath, outputPath) {
  const gzip = zlib.createGzip();  // 建立壓縮物件
  const source = fs.createReadStream(inputPath);  // 建立讀檔資料流
  const destination = fs.createWriteStream(outputPath);  // 建立寫檔資料流
  await pipeline(source,gzip,destination);  //(同步等待)串接資料流: 讀檔->壓縮->寫檔
}

// 解壓縮檔案的函數(參考上面的註解)
async function decompressFile(inputPath, outputPath) {
  const gunzip = zlib.createGunzip();
  const source = fs.createReadStream(inputPath);
  const destination = fs.createWriteStream(outputPath);
  await pipeline(source,gunzip,destination);
}

// async/await 使用範例
await compressFile('input.txt', 'input.txt.gz'); // 將 'input.txt' 壓縮為 'input.txt.gz'
await decompressFile('input.txt.gz', 'output.txt'); // 將 'input.txt.gz' 解壓縮為 'output.txt'
