// src/websocket.js
class WebSocketService {
    constructor(url) {
      this.url = url;
      this.socket = null;
    }
  
    connect(onMessageCallback) {
      this.socket = new WebSocket(this.url);
  
      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.socket.onmessage = (message) => {
        console.log('Received:', message.data);
        if (onMessageCallback) {
          onMessageCallback(message.data);
        }
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
      };
  
      this.socket.onerror = (error) => {
        console.log('WebSocket error:', error);
      };
    }
  
    sendMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      } else {
        console.log('WebSocket is not open. Unable to send message.');
      }
    }
  }
  
  export default WebSocketService;
  