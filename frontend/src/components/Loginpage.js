import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from '../config/firebase'; // Import necessary Firebase functions
import './Login.css';
import ChatInterface from './ChatInterface'; // Import ChatInterface component

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Check if user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // Update state if user is authenticated
      }
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); // Use signInWithEmailAndPassword with auth instance
      console.log('Signed in as:', email); // Log successful login
      setIsLoggedIn(true); // Update login state to true
      onLogin(); // Trigger login state update or navigation
      // navigate('/'); // Navigate to main application page (adjust as needed)
    } catch (err) {
      setError(err.message);
    }
  };

  // Render ChatInterface if isLoggedIn is true
  if (isLoggedIn) {
    return <ChatInterface />;
  }

  // Render login form otherwise
  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSignIn} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
