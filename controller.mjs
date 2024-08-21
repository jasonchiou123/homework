import http from 'http';    //http模組
import model from './model.mjs';

// 建立 HTTP 伺服器
const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/data') {
    // 查詢資料庫
    let results = await model.find();  //呼叫資料庫處理函式
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: '路徑未找到' }));
  }
});

// 伺服器監聽
server.listen(3000, () => {
  console.log('伺服器正在 http://localhost:3000 上運行');
});
