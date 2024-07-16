// src/App.js
import React, { useState, useEffect } from 'react';
import WebSocketService from './websocket';

const App = () => {
  const [wsService, setWsService] = useState(null);
  const [status, setStatus] = useState(0);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    const webSocketService = new WebSocketService('ws://192.168.9.14:8080');
    webSocketService.connect((message) => {
      setServerMessage(message);
    });
    setWsService(webSocketService);
  }, []);

  const handleClick = () => {
    const newStatus = status === 0 ? 1 : 0;
    setStatus(newStatus);
    if (wsService) {
      wsService.sendMessage(newStatus.toString());
    }
  };

  return (
    <div>
      <h1>WebSocket Client</h1>
      <button onClick={handleClick}>
        Send {status === 0 ? '1' : '0'}
      </button>
      <p>Server Message: {serverMessage}</p>
    </div>
  );
};

export default App;
