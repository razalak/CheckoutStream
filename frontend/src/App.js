// src/App.js
import React from 'react';
import './App.css'; // Optional: Import your CSS or styling here
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;
