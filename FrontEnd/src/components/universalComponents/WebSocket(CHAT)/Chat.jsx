import React, { useState, useEffect, useContext, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import AuthContext from '../../../context/AuthProvider';
import { FiArrowDown } from "react-icons/fi";

// Polyfill for the global object
if (typeof global === 'undefined') {
  window.global = window;
}

const Chat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]); // Array of messages with user and timestamp
  const [message, setMessage] = useState('');
  const { auth } = useContext(AuthContext);
  const [username] = useState(auth.username); // Get username from auth context
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const container = chatContainerRef.current;
      if (container) {
        // Calculate if the user is scrolled to the bottom (allowing a 5px tolerance)
        const atBottom =
          container.scrollHeight - container.scrollTop - container.clientHeight < 5;
        setIsAtBottom(atBottom);
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
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
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }), // Add timestamp
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

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="p-4 h-[85vh] w-full overflow-hidden flex flex-col">
      {/* Chat Messages */}
      {/* CHANGE: Attach ref to chat container */}
      <div
        id="chat"
        ref={chatContainerRef}
        className="flex flex-col overflow-scroll no-scrollbar mb-4 w-full"
      >
        {messages.map((msg, index) => {
          // Get the previous message if available
          const prevMsg = index > 0 ? messages[index - 1] : null;
          const isSameUser = prevMsg && prevMsg.sender === msg.sender;

          // Convert timestamps into Date objects for comparison
          // We're using a dummy date so that we can compare times only
          const parseTime = (timeStr) => new Date(`1970/01/01 ${timeStr}`);
          const prevTime = isSameUser ? parseTime(prevMsg.timestamp) : null;
          const currTime = parseTime(msg.timestamp);

          // Calculate time difference in milliseconds
          const timeDiff = prevTime ? currTime - prevTime : null;
          const withinTwoMinutes = timeDiff !== null && timeDiff <= 2 * 60 * 1000;

          // Show the username only if this is the first message in a series
          const showUsername = !(isSameUser && withinTwoMinutes);

          return (
            <div
              key={index}
              className={`py-1 max-w-[80%] ${
                msg.sender === username ? 'self-end w-[80%]' : ''
              }`}
            >
              {showUsername && (
                <div className="text-sm font-semibold">{msg.sender}</div>
              )}
              <div
                className={`rounded-lg p-2 ${
                  msg.sender === username
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <div className="text-sm">{msg.content}</div>
                <div
                  className={`text-xs mt-1 text-end ${
                    msg.sender === username
                      ? 'text-gray-100 self-end'
                      : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHANGE: Scroll to bottom button */}
      <button onClick={scrollToBottom} className={`fixed bottom-24 right-4 bg-green-500 text-white p-2 rounded duration-200 ${!isAtBottom ? "opacity-100" : "opacity-0"}`}>
        <FiArrowDown />
      </button>

      {/* Message Input */}
      <div className="flex gap-2 fixed bottom-8">
        <input
          type="text"
          id="message"
          className="flex-1 border p-2 rounded"
          placeholder="Type your message"
          value={message}
          // CHANGE: Add onKeyDown event to send on Enter key
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
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
