import http from 'http';    //http模組
import fs from 'fs';       //檔案處理模組
import url from 'url';     //url模組 
import { IncomingForm } from 'formidable';  //上傳檔案的套件

const server = http.createServer( (req, res)=> {    //req:請求,res:回應
    if (req.url === '/fileupload') {
        const form = new IncomingForm();
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        form.parse(req, (err, fields, files)=> {  //異步函式:當上傳檔案完成後執行
            if (err) {
                return res.end('上傳檔案時發生錯誤: ' + err.stack);
            }
            const oldPath = files.filetoupload[0].filepath;  //系統內定檔案路徑
            const newPath = './' + files.filetoupload[0].originalFilename;  //當前檔案路徑
            fs.renameSync(oldPath, newPath);  //同步等待:檔案路徑移動
            res.write("<br>欄位值:" + fields.memo[0]);  //取得欄位值
            res.write('<br>檔案已上傳!');
            res.end();
        });
    } else if (req.url.startsWith('/api')) { 
        let query = url.parse(req.url, true).query;    //url解析,並取得?後面的參數 
        let txt =`${query.year}年${query.month}月${query.day}日`;  
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(txt);
        res.end();
    } else {    
        res.writeHead(200, {'Content-Type': 'text/html'});
        let data = fs.readFileSync('data.html');    //同步等待讀檔
        res.write(data);    //輸出到瀏覽器
        res.end();
    }
})

server.listen(8080, () => {     //開始服務:監聽port:8080
    console.log('主機已啟動: http://localhost:8080/ ...');
});
