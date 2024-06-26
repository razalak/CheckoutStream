// src/components/ChatInterface.js

import React, { useState } from 'react';
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, fromUser: true }]);

    try {
      await axios.post('http://localhost:5000/api/message', {
        message: message
      });

      // Do not update state with bot's response
    } catch (error) {
      console.error('Error sending message to backend:', error);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={{ ...styles.message, textAlign: msg.fromUser ? 'right' : 'left' }}>
            <strong>{msg.fromUser ? 'You' : 'Bot'}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            handleSendMessage(e.target.value.trim());
            e.target.value = '';
          }
        }}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  chatContainer: {
    width: '100%',
    maxWidth: '480px', // Suitable for mobile screens
    margin: '20px auto', // Add some margin to center the chat box vertically
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '70vh' // Adjust height to fit mobile screens better and not take full screen
  },
  messagesContainer: {
    flex: 1,
    padding: '10px',
    overflowY: 'scroll',
    backgroundColor: '#f9f9f9'
  },
  message: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: '#e1ffc7',
    maxWidth: '75%',
    wordBreak: 'break-word'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderTop: '1px solid #ccc',
    outline: 'none'
  }
};

export default ChatInterface;
