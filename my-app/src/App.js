// WebSocketButton.js
import React, { useState, useEffect } from 'react';

const App = () => {
  const [ws, setWs] = useState(null);
  const [buttonState, setButtonState] = useState(0);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws');
    socket.onopen = () => {
      console.log('WebSocket connected');
      setWs(socket);
    };
    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setWs(null);
    };
    socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };
    return () => socket.close();
  }, []);

  const toggleButtonState = () => {
    const newState = buttonState === 0 ? 1 : 0;
    setButtonState(newState);
    console.log('Sending state:', newState);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ state: newState }));
    } else {
      console.error('WebSocket is not open');
    }
  };

  return (
    <button onClick={toggleButtonState}>
      {buttonState === 0 ? 'Turn On' : 'Turn Off'}
    </button>
  );
};

export default App;
