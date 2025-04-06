// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import Logout from './components/logout';
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import Chatbot from './components/Chatbot';
import ImageUpload from './components/ImageUpload';
import styled, { ThemeProvider } from 'styled-components';

const lightTheme = {
  body: '#F8F5F0',
  text: '#333333',
  header: '#FFFFFF',
  // footer: '#FFFFFF',
  buttonColor: '#5CB85C',
  recipeText: '#666666',
  inputBackground: '#FFFFFF',
  inputTextColor: '#000000',
  imageUploadText: '#000000',
  };

const darkTheme = {
  body: '#1E1E1E',
  text: '#F0F0F0',
  header: '#2C2C2C',
  // footer: '#2C2C2C',
  buttonColor: '#8FBC8F',
  recipeText: '#D3D3D3',
  inputBackground: '#35363A',
  imageUploadText: '#FFFFFF',
  inputTextColor: '#FFFFFF',
  };

const AppContainer = styled.div`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  transition: background-color 0.3s, color 0.3s;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding-bottom: 50px;
`;

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <AppContainer>
        <Router>
          <div className="app">
            <Header
              theme={currentTheme}
              toggleTheme={toggleTheme}
            />
            <ContentContainer className="content">
              <Routes>
                <Route path="/" element={<RecipeList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/upload" element={<ImageUpload />} />
                <Route path="/chatbot" element={<Chatbot />} />
              </Routes>
            </ContentContainer>
            
          </div>
          {/* <Footer theme={currentTheme} /> */}
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;