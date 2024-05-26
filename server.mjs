import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  console.log(`新用戶: ${username} 連接了`);
  const msg = { username, text: "加入了聊天室" };
  socket.emit('message', msg);
 
  socket.on('disconnect', () => {
    console.log(`用戶: ${username} 斷開連接`);
    const msg = { username, text: "離開了聊天室" };
     socket.emit('message', msg);
  });

  socket.on('message', (message) => {
    console.log(`收到消息： ${message.username} : ${message.text}`);
    io.emit('message', message); // 廣播消息給其他用戶
  });
});

const PORT = 4000;
io.listen(PORT);
console.log(`伺服器正在監聽端口 ${PORT}`);
