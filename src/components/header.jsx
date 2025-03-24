// src/components/Header.jsx
import React, { useState } from 'react';
import './Header.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styled from 'styled-components';
import { FaMicrophone, FaMoon, FaSun, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ThemeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${(props) => props.theme.buttonColor}; /* Change to buttonColor */

  &:hover {
    opacity: 0.8;
  }
`;

const VoiceSearchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-right: 0.5rem;
  color: ${(props) => props.theme.buttonColor};  /* Change to buttonColor */

  &:hover {
    opacity: 0.8;
  }
`;

const ChatbotButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-right: 0.5rem;
  color: ${(props) => props.theme.buttonColor}; /* Change to buttonColor */

  &:hover {
    opacity: 0.8;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;  /* Remove padding */
  margin: 0;   /* Remove margins */
`;

const NavItem = styled.li`
  margin-left: 1rem;  /* Adjust spacing */
`;

const NavLink = styled(Link)`
  color: ${(props) => props.theme.text};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.text};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const HeaderH1 = styled.h1`
  color: ${(props) => props.theme.text};
`;

function Header({ theme, toggleTheme, isLoggedIn, handleLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening();
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setSearchQuery(transcript);
    console.log('Voice Search Transcript:', transcript);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <header className="header" style={{ backgroundColor: theme.header, color: theme.text }}>
      <div className="container">
        <HeaderH1>Recipe App</HeaderH1>
        <nav>
          <NavList>
            <NavItem><StyledLink href="/" style={{ color: theme.text }}>Home</StyledLink></NavItem>
            <NavItem><StyledLink href="/upload" style={{ color: theme.text }}>Image Upload</StyledLink></NavItem>
            {isLoggedIn ? (
              <NavItem>
                <StyledLink onClick={handleLogout} style={{ color: theme.text }}>Logout</StyledLink>
              </NavItem>
            ) : (
              <NavItem>
                <StyledLink href="/login" style={{ color: theme.text }}>Login</StyledLink>
              </NavItem>
            )}
          </NavList>
        </nav>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ color: theme.text }}
          />
          <VoiceSearchButton onClick={startListening} disabled={listening}>
            <FaMicrophone />
          </VoiceSearchButton>
          <ThemeButton onClick={toggleTheme} theme={theme}>
            {theme.body === '#FFFFFF' ? <FaMoon /> : <FaSun />}
          </ThemeButton>
          <Link to="/chatbot">
            <ChatbotButton>
              <FaComment />
            </ChatbotButton>
          </Link>
          {listening && <div>Listening...</div>}
        </div>
      </div>
    </header>
  );
}

export default Header;