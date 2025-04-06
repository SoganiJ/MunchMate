import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { Home, Upload, LogOut, LogIn, MessageSquare, User } from 'lucide-react';
import styled from 'styled-components';

const Sidebar = styled.aside`
  background: linear-gradient(to bottom, #fff8e1, #ffecb3);
  color: #4a2c14;
  width: 250px;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
`;

const SidebarContent = styled.div`
  flex-grow: 1;
`;

const SidebarTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #4a2c14;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 10px;
  transition: background 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background: rgba(255, 140, 0, 0.2);
  }
`;

const StyledLink = styled(Link)`
  color: #4a2c14;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthContainer = styled.div`
  margin-bottom: 20px;
  margin-top: auto; /* Stick to the bottom */
`;

const ProfileInfo = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-bottom: 10px;
  text-align: center;
`;

function SidebarNav({ isLoggedIn, handleLogout, username }) {  // Added username prop
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const navigate = useNavigate(); // Use useNavigate

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogoutAndNavigate = () => {
    handleLogout();
    navigate('/login'); // Navigate to login after logout
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarTitle style={{ fontWeight: "bold", fontSize: "2.1rem", fontFamily: "cursive" }}>MunchMate</SidebarTitle>
        <nav>
          <NavList>
            <NavItem>
              <StyledLink to="/" style={{ fontFamily: "monospace", fontSize: "1.2rem" }}>
                <Home /> Tasty Bites
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/upload" style={{ fontFamily: "monospace", fontSize: "1.2rem" }}>
                <Upload /> Image Recognition
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/chatbot" style={{ fontFamily: "monospace", fontSize: "1.2rem" }}>
                <MessageSquare /> MeasuRey
              </StyledLink>
            </NavItem>
          </NavList>
        </nav>
      </SidebarContent>

      <AuthContainer>
        <NavItem onClick={toggleProfileOptions} style={{ cursor: 'pointer' }}>
          <User /> Profile
        </NavItem>

        {showProfileOptions && (
          <>
            {isLoggedIn ? (
              <div>
                <ProfileInfo>
                  {username ? (
                    <p>Logged in as: {username}</p>
                  ) : (
                    <p>Logged In</p>
                  )}

                </ProfileInfo>
                <NavItem onClick={handleLogoutAndNavigate} style={{ cursor: 'pointer' }}>
                  <LogOut /> Logout
                </NavItem>
              </div>
            ) : (
              <NavItem>
                <StyledLink to="/login">
                  <LogIn /> Login
                </StyledLink>
              </NavItem>
            )}
          </>
        )}
      </AuthContainer>
    </Sidebar>
  );
}

export default SidebarNav;