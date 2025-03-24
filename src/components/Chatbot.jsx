import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styled from 'styled-components';
import { FaMicrophone, FaCamera } from 'react-icons/fa';

const ParentContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  min-height: 100vh; /* Ensure the parent takes up at least the full viewport height */
  margin: 0; /* Remove default margins */
  /* Add any other styles for your parent container if needed */
`;

const ChatbotContainer = styled.div`
  width: 100%;
  max-width: 800px;
  /* margin: 0 auto; Removed as ParentContainer handles horizontal centering */
  background-color: #202124;
  color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ChatBox = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #444444 #202124; /* For Firefox */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #202124;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #444444;
    border-radius: 3px;
  }
`;

const Message = styled.div`
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  word-break: break-word;
  max-width: 70%;
  clear: both;

  &.user {
    background-color: #35363A;
    color: #fff;
    align-self: flex-start; /* Align user messages to the left */
  }

  &.bot {
    background-color: #424549;
    color: #fff;
    align-self: flex-end; /* Align bot messages to the right */
  }
`;

const InputArea = styled.div`
  display: flex;
  padding: 15px;
  border-top: 1px solid #333;
  background-color: #333;

  input {
    flex-grow: 1;
    padding: 10px;
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    background-color: ${(props) => props.theme.inputBackground || '#fff'}; // Added default white
    color: ${(props) => props.theme.inputTextColor}; // Use theme-based text color
  }

  button {
    background-color: transparent; /* Keep buttons without background */
    border: none;
    color: #fff;
    padding: 10px 15px;
    border-radius: 25px; /* Make buttons more rounded */
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0 5px; /* Add gap between the buttons */
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Subtle hover effect */
  }
`;

const CameraButton = styled.button`
  background-color: transparent; /* Make the button transparent */
  border: none;
  color: #fff; /* Keep the icon white */
  cursor: pointer;
  font-size: 1.2rem;
  transition: opacity 0.3s;
  margin-right: 10px;

  &:hover {
    opacity: 0.7; /* Subtle hover effect */
  }
`;

const SpeechButton = styled.button`
  background-color: transparent; /* Make the button transparent */
  border: none;
  color: #fff; /* Keep the icon white */
  cursor: pointer;
  font-size: 1.2rem;
  transition: opacity 0.3s;
  margin-right: 10px;

  &:hover {
    opacity: 0.7; /* Subtle hover effect */
  }
`;

const SendButton = styled.button`
  background-color: #546E7A;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 25px; /* More rounded */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #455A64;
  }
`;

const PremiumMessage = styled.div`
  padding: 15px;
  text-align: center;
  color: #FFC107;
`;

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const chatBoxRef = useRef(null);
  const [premiumMessage, setPremiumMessage] = useState('');
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    setSessionId(generateSessionId());

    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const sendMessage = async () => {
    if (!input && !transcript) return;

    const messageToSend = input || transcript;
    setMessages([...messages, { text: messageToSend, sender: 'user' }]);

    try {
      const response = await fetch('http://localhost:4000/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend, sessionId: sessionId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
      }

      const data = await response.json();
      setMessages([...messages, { text: messageToSend, sender: 'user' }, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...messages, { text: messageToSend, sender: 'user' }, { text: "Sorry, I couldn't understand that. Please try again.", sender: 'bot' }]);
    }

    setInput('');
    resetTranscript();
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening();
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setInput(transcript);
  };

  const handleCameraClick = () => {
    setPremiumMessage('This feature requires the premium version of our app. Please upgrade to unlock image-based recipe suggestions.');
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <ParentContainer>
      <ChatbotContainer>
        <ChatBox ref={chatBoxRef}>
          {messages.map((message, index) => (
            <Message key={index} className={`message ${message.sender}`}>
              {message.text}
            </Message>
          ))}
        </ChatBox>
        <InputArea>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What would you like to know?"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <SpeechButton onClick={startListening} disabled={listening}>
            <FaMicrophone />
          </SpeechButton>
          <CameraButton onClick={handleCameraClick}>
            <FaCamera />
          </CameraButton>
          <SendButton onClick={sendMessage}>Send</SendButton>
        </InputArea>
        {premiumMessage && <PremiumMessage>{premiumMessage}</PremiumMessage>}
      </ChatbotContainer>
    </ParentContainer>
  );
}

export default Chatbot;