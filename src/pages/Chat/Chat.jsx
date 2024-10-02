import React, { useState, useRef } from 'react';
import Websocket from 'react-websocket';

function TrelloChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How’s the project going?', sender: 'other' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);

  const handleMessage = (message) => {
    const parsedMessage = JSON.parse(message);
    setMessages((prevMessages) => [...prevMessages, parsedMessage]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me'
      };
      setMessages([...messages, newMsg]);

      const messageToSend = JSON.stringify(newMsg);
      socketRef.current.sendMessage(messageToSend);

      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
        <h1 className="text-xl font-bold">Trello Chat</h1>
        <span className="text-sm">Project: Website Redesign</span>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} text={message.text} sender={message.sender} />
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>

      <Websocket
        url="ws://localhost:5178/chat"
        onMessage={handleMessage}
        ref={socketRef}
      />
    </div>
  );
}

function MessageBubble({ text, sender }) {
  const isMe = sender === 'me';
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-3 rounded-lg shadow-md ${isMe ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        {text}
      </div>
    </div>
  );
}

export default TrelloChat;
