import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// Polyfill for the global object
if (typeof global === 'undefined') {
  window.global = window;
}

const Chat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]); // Array of messages with user and timestamp
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('User123'); // Replace with actual username from your app

  useEffect(() => {
    const socket = new SockJS('http://localhost:3500/websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected');
        client.subscribe('/topic/chat', (message) => {
          const receivedMessage = JSON.parse(message.body);
          showMessage(receivedMessage);
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
      const chatMessage = {
        content: message,
        sender: username, // Include the sender's username
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }), // Add timestamp
      };
      stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(chatMessage),
      });
      setMessage('');
    } else {
      console.log('STOMP client is not connected');
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Chat Messages */}
      <div id="chat" className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg max-w-[80%] ${
              msg.sender === username
                ? 'bg-blue-500 text-white self-end' // Style for the current user's messages
                : 'bg-gray-200 text-gray-800 self-start' // Style for other users' messages
            }`}
          >
            <div className="text-sm font-semibold">{msg.sender}</div>
            <div className="text-sm">{msg.content}</div>
            <div className="text-xs text-gray-500 mt-1">{msg.timestamp}</div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex gap-2">
        <input
          type="text"
          id="message"
          className="flex-1 border p-2 rounded"
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
          className="bg-red-500 text-white p-2 rounded"
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default Chat;