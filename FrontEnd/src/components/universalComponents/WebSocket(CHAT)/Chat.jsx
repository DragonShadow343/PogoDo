import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// Polyfill for the global object
if (typeof global === 'undefined') {
  window.global = window;
}

const Chat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected');
        client.subscribe('/topic/chat', (message) => {
          showMessage(JSON.parse(message.body).content);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected');
      },
    });
    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const showMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (stompClient && stompClient.connected && message.trim() !== '') {
      stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify({ content: message }),
      });
      setMessage('');
    } else {
      console.log('STOMP client is not connected');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Real-Time Chat</h1>
      <div id="chat" className="mb-4">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        id="message"
        className="border p-2 mr-2"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Send
      </button>
      <button
        onClick={() => stompClient && stompClient.deactivate()}
        className="bg-red-500 text-white p-2 rounded ml-2"
      >
        Disconnect
      </button>
    </div>
  );
};

export default Chat;