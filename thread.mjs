import {Worker,isMainThread,workerData,parentPort} from 'worker_threads';
import { execSync } from 'child_process';

let count = 0;
let intervalId = null;
function sayHello() {
  console.log('Hello, world!');
  count++;
  if (count >= 5) {
    clearInterval(intervalId);  //10次後,關閉定時任務
  }
}

if (isMainThread) {  //主執行緒, 由主程式執行,用第一個CPU
  intervalId = setInterval(sayHello, 1000);  //故意每隔 1 秒執行,模擬多工
  const data = 'some data';
  const worker = new Worker("./thread.mjs", { workerData: data });  //子執行緒檔名, 傳遞用資料
  worker.on('message', msg => console.log('子執行緒回傳:', msg));
} else {  //子執行緒: 由 Worker 執行,用第二個CPU
  const source = workerData;  //從主程式傳來的資料
  let output='';
  setTimeout(() => {
    const stdout = execSync('ls -l');  //exec的同步等待版本,但因不同CPU,不會卡住主執行緒
    output=`${source}:命令輸出: ${stdout}`;
    parentPort.postMessage(output);  //回傳給主程式
  }, 2000);   //等待 2 秒後再執行
}