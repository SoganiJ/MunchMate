import React, { useState, useRef, useEffect } from "react";
import SidebarNav from "./header";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Mic, Send, Camera } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(to bottom, #fff8e1, rgb(255, 255, 255));
  padding-left: 300px;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 300px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #444;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

const ChatbotContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const ChatBox = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 400px;
  overflow-y: auto;
  padding: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  scrollbar-width: thin;
  scrollbar-color: #444 #ffecb3;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 3px;
  }
`;

const Message = styled.div`
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 20px;
  word-break: break-word;
  max-width: 70%;
  background-color: ${({ sender }) => (sender === "user" ? "#ffecb3" : "#FDF0CA")};
  color: black;
  align-self: ${({ sender }) => (sender === "user" ? "flex-end" : "flex-start")};
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  background:#FDE59F;
  border-radius: 15px;

  input {
    flex-grow: 1;
    padding: 10px;
    border: none;
    border-radius: 15px;
    background:rgb(255, 248, 227);
    color: black;
    outline: none;
  }

  button {
    background: transparent;
    border: none;
    color: black;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: 0.3s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const PremiumMessage = styled.div`
  text-align: center;
  color:rgb(0, 0, 0);
  padding: 10px;
`;

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [premiumMessage, setPremiumMessage] = useState("");
  const chatBoxRef = useRef(null);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening } = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState(false); // New state

  useEffect(() => {
    setSessionId(generateSessionId());
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const generateSessionId = () => Math.random().toString(36).substring(2, 15);

  const sendMessage = async () => {
    if (!input && !transcript) return;
    const messageToSend = input || transcript;
    setMessages([...messages, { text: messageToSend, sender: "user" }]);

    try {
      const response = await fetch("/api/message", {  // Corrected URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend, sessionId }),
      });

      if (!response.ok) throw new Error("Error in API response");

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { text: "I couldn't understand that. Try again.", sender: "bot" }]);
    }

    setInput("");
    resetTranscript();
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleMicClick = () => {
    if (isRecording) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
      resetTranscript();
      setInput("");
    }
  };

  useEffect(() => {
    if (!listening && isRecording) {
      setInput(transcript);
      setIsRecording(false);
    }
  }, [listening, transcript, isRecording]);

  const handleCameraClick = () => setPremiumMessage("Image-based AI requires a premium upgrade.");

  if (!browserSupportsSpeechRecognition) return <span>Browser doesn't support speech recognition.</span>;

  return (
    <PageContainer>
      <SidebarNav />
      <MainContent>
        <Title>MeasuRey</Title>
        <ChatbotContainer
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ChatBox ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <Message key={index} sender={msg.sender}>
                {msg.text}
              </Message>
            ))}
          </ChatBox>

          <InputArea>
            <input
              type="text"
              value={listening ? transcript : input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={handleMicClick}>
              <Mic size={20} />
            </button>
            <button onClick={handleCameraClick}>
              <Camera size={20} />
            </button>
            <button onClick={sendMessage}>
              <Send size={20} />
            </button>
          </InputArea>

          {premiumMessage && <PremiumMessage>{premiumMessage}</PremiumMessage>}
        </ChatbotContainer>
      </MainContent>
    </PageContainer>
  );
}

export default Chatbot;
