// src/components/Login.jsx
import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <div className="form-actions">
          <button type="button">Sign In</button>
          <a href="#">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;