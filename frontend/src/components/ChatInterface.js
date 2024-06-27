// src/components/ChatInterface.js

import React, { useState } from 'react';
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, fromUser: true }]);

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
      }
    }
  };

  
  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              textAlign: msg.fromUser ? 'right' : 'left',
              backgroundColor: msg.fromUser ? '#e1ffc7' : '#ffa500' // Orange color for bot messages
            }}
          >
            <strong>{msg.fromUser ? 'You' : 'Server'}</strong>: {msg.text}
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
    margin: '120px auto 20px auto', // Add margin-top to lower the chat box
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
