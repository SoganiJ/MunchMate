import React, { useState } from "react";
import styled from "styled-components";
import SidebarNav from "./header";
import axios from 'axios';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(to bottom, #fff8e1, #ffecb3);
  padding-left: 350px;
`;

const AuthContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  margin: auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #444;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
  background: #ff9800;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #e68900;
  }

  &:disabled {
    background: #ccc; /* Or any other greyed-out color */
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: #ff9800;
  font-size: 0.9rem;
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

function Login() {
  const [popup, setPopup] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true); // Start loading
        setErrorMessage(""); // Clear any previous errors

        try {
            const response = await axios.post('/api/login', {  // Corrected URL
                username: username,
                password: password
            });

            if (response.status === 200) {
                setPopup(true);
                setTimeout(() => setPopup(false), 2000);
            } else {
                setErrorMessage(response.data.message || "Login failed. Invalid username or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Login failed. Please try again.");
        } finally {
            setIsLoading(false); // End loading
        }
    };

    const handleRegister = async () => {
        setIsLoading(true); // Start loading
        setErrorMessage(""); // Clear any previous errors

        try {
            const response = await axios.post('/api/register', { // Corrected URL
                username: registerUsername,
                password: registerPassword
            });

            if (response.status === 201) {
                alert('Registration successful! Please log in.');
                setIsRegistering(false); // Switch back to login form
            } else {
                setErrorMessage(response.data.message || 'Registration failed.  Please try again.'); // IMPORTANT: Get error message from response
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('Registration failed. Username may be taken.');
        } finally {
            setIsLoading(false); // End loading
        }
    };

  return (
    <PageContainer>
      <SidebarNav />
      <AuthContainer>
        <Title>{isRegistering ? "Register" : "Login"}</Title>

        {isRegistering ? (
          // Registration Form
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <FormGroup>
              <Label htmlFor="registerUsername">Username:</Label>
              <Input
                type="text"
                id="registerUsername"
                placeholder="Choose a username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="registerPassword">Password:</Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="registerPassword"
                placeholder="Choose a password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
               <label>
                 <input
                   type="checkbox"
                   checked={showPassword}
                   onChange={() => setShowPassword(!showPassword)}
                 />
                 Show Password
               </label>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </FormGroup>
            <FormActions>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
              <Link href="#" onClick={() => setIsRegistering(false)}>
                Already have an account? Login
              </Link>
            </FormActions>
          </form>
        ) : (
          // Login Form
          <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
            <FormGroup>
              <Label htmlFor="username">Username:</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password:</Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
             <label>
                 <input
                   type="checkbox"
                   checked={showPassword}
                   onChange={() => setShowPassword(!showPassword)}
                 />
                 Show Password
               </label>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </FormGroup>
            <FormActions>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <Link href="#">Forgot Password?</Link>
              <Link href="#" onClick={() => setIsRegistering(true)}>
                Create an account
              </Link>
            </FormActions>
          </form>
        )}
      </AuthContainer>

      {popup && <Popup>✔ Login Successful!</Popup>}
    </PageContainer>
  );
}

export default Login;
