import { spawn } from 'child_process';

// 使用 spawn 執行linux命令:'grep' 來搜索 hello 字串
const grep = spawn('grep', ['hello']);

// 向子進程的 stdin 寫入提供grep搜索的數據
grep.stdin.write('hello world\n');
grep.stdin.write('goodbye world\n');
grep.stdin.end();

// 處理標準輸出
grep.stdout.on('data', (data) => {
  console.log(`標準輸出: ${data}`);  //只輸出hello world, goodbye world不符合條件
});

// 處理標準錯誤輸出
grep.stderr.on('data', (data) => {
  console.error(`標準錯誤輸出: ${data}`);
});

// 處理子進程結束事件
grep.on('close', (code) => {
  console.log(`子進程退出碼: ${code}`);  // 0 表示程式正常退出
});
