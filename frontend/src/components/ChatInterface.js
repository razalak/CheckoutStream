import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatInterface.css'; // Import CSS file for ChatInterface

const ChatInterface = () => {
  const [messages, setMessages] = useState([{ text: 'Type Order details in the specified structure........', fromUser: false }]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, fromUser: true }]);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/message', {
        message: message
      });

      // Assuming success response contains a message field
      if (response.data.message) {
        setMessages(prevMessages => [...prevMessages, { text: response.data.message, fromUser: false }]);
      }
    } catch (error) {
      // If there's an error response, display the error message
      if (error.response && error.response.data && error.response.data.error) {
        setMessages(prevMessages => [...prevMessages, { text: error.response.data.error, fromUser: false }]);
      } else {
        console.error('Error sending message to backend:', error);
        setErrorMessage('Error sending message to the backend. Please try again.');
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.fromUser ? 'user-message' : 'server-message'}`}
          >
            <strong>{msg.fromUser ? 'You' : 'Server'}</strong>: {msg.text}
          </div>
        ))}
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <input
        type="text"
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            handleSendMessage(e.target.value.trim());
            e.target.value = '';
          }
        }}
        className="input"
      />
    </div>
  );
};

export default ChatInterface;
