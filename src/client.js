import React, { useState } from 'react';
import io from 'socket.io-client';

export default function Chat () {
  const [username, setUsername] = useState('');  //用戶名
  const [message, setMessage] = useState('');  //輸入的訊息
  const [chat, setChat] = useState([]);  //聊天訊息陣列
  const [socket, setSocket] = useState(null);  //socket連線物件
  const [hasUsername, setHasUsername] = useState(false);  //是否已有用戶名

  // 建立連線
  const connectSocket = () => {
    const newSocket = io('http://localhost:4000', { query: { username } });
    setSocket(newSocket);
    setHasUsername(true); // 設定已有用戶名
    newSocket.on('message', (message) => {
      setChat((prevChat) => [...prevChat, message]);
    });
  };

  // 斷開連線
  const disconnectSocket = () => {
    if (socket) socket.disconnect();
    setSocket(null);
    setHasUsername(false);
  };

  // 發送消息
  const onMessageSubmit = () => {
    const msg = { username, text: message };
    socket.emit('message', msg);
    setMessage('');
  };

  return (
    <div>
      <h1>React 聊天室</h1>
      {!hasUsername && (
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="輸入您的名字"
        />
      )}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="輸入消息"
        disabled={!socket}
      />
      {!socket && (
        <button onClick={connectSocket} disabled={hasUsername}>連線</button>
      )}
      {socket && (
        <button onClick={disconnectSocket}>斷線</button>
      )}
      <button onClick={onMessageSubmit} disabled={!socket}>發送消息</button>
      <div>
        {chat.map(({ username, text }, index) => (
          <div key={index}>
            <h3>
              {username}: <span>{text}</span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};









