import crypto from 'crypto';
import fs from 'fs'; 

const algorithm = 'aes-256-ctr';  // 定義加密演算法
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'; // 自訂的密鑰:必須是32個字元
const iv = crypto.randomBytes(16); // 初始化向量:隨機的16個字元

// 加密函數
const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

// 解密函數
const decrypt = (ivStr, content) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivStr, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
  return decrypted.toString();
};

//加密檔案: 使用同步函式: 
//直到檔案處理完畢, 才會執行後續的程式碼
const fileContent = fs.readFileSync('input.txt', 'utf8');  //此行會等到讀檔完成
const hash = encrypt(fileContent);
fs.writeFileSync('encrypt.txt', hash.content);  //同上,不過這裡是寫入

//解密檔案: 使用"非同步"函式:
//一邊讀檔,一邊往下執行程式碼
fs.readFile('encrypt.txt', 'utf8', (err, data) => {  //處理函式:讀檔完成才會執行此
  if (err) {
    console.error(err);
    return;
  }
  const text = decrypt(hash.iv,data);
  fs.writeFile('decrypt.txt', text, writer); //處理函式:writer 也可以拉出來做處理
});

//此函式會等到寫檔完成才會執行
const writer=(err, data) => {  
  if (err) {
    console.error(err);
    return;
  }
  console.log("已經解密"); // 這行後面才印出
};

console.log("處理中...");  //所以這行會先印出

