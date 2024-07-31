import { exec } from "child_process"
import iconv from 'iconv-lite'  //文字轉碼

//指令輸出 stdout, stderr 先轉為 binary Buffer
//這是異步指令，不會等指令執行完成
exec('ping www.google.com',{encoding: 'binary'},(error, stdout, stderr) => { //執行完成後執行的函式
  if (error) {
    console.error(`run err: ${error}`);
    return;
  }
  //windows 10 命令列提示字元, 中文編碼為 big5
  const output = iconv.decode(Buffer.from(stdout, 'binary'), 'big5');  //轉碼中文
  const errorOutput = iconv.decode(Buffer.from(stderr, 'binary'), 'big5');  //轉碼中文
  console.log(`輸出: ${output}`);
  console.error(`錯誤: ${errorOutput}`);
});

console.log("等待輸出中...");  //所以這行會先印出
