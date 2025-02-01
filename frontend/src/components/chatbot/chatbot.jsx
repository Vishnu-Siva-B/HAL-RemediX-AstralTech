import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css';
import { IoSend } from 'react-icons/io5';
import { GoogleGenerativeAI } from '@google/generative-ai';

const LOCAL_STORAGE_KEY = 'chatMessages'; // Key for storing messages

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Load messages from local storage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save messages to local storage every time messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll only when messages reach bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = chatContainerRef.current;
      const nearBottom = scrollHeight - scrollTop <= clientHeight + 50; // Buffer for smoothness

      if (nearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const hitRequest = () => {
    if (message.trim() !== '') {
      generateResponse(message);
    } else {
      alert('You must write something...');
    }
  };

  const generateResponse = async (msg) => {
    setLoading(true);

    const genAI = new GoogleGenerativeAI('AIzaSyCerrnXcXTHpcufQ_bPwBzV1h_IK-1QnMg');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(msg);
    const botResponse = result.response.text();

    const newMessages = [
      ...messages,
      { type: 'userMsg', text: msg },
      { type: 'responseMsg', text: botResponse },
    ];

    setMessages(newMessages);
    setMessage('');
    setLoading(false);
  };

  // Handle Enter key to send the message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message.trim() !== '') {
      hitRequest();
    }
  };

  return (
    <div className="container w-screen min-h-screen dark:bg-[#0E0E0E] text-white flex flex-col">
      <div className="header pt-[25px] flex items-center justify-between w-full px-[300px]">
        <h2 className="text-2xl text-black">AssistMe</h2>
      </div>

      <div className="messages" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.type} ${msg.type === 'userMsg' ? 'user' : 'ai'}`}
          >
            <div className={`profile-icon ${msg.type === 'userMsg' ? 'left' : 'right'}`}>
              {msg.type === 'userMsg' ? (
                <div className="user-icon">👤</div> // User profile icon
              ) : (
                <div className="ai-icon">🤖</div> // AI profile icon
              )}
            </div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        {loading && <div className="responseMsg">Loading...</div>}
        <div ref={messagesEndRef} /> {/* Invisible anchor for smooth scrolling */}
      </div>

      <div className="bottom">
        <div className="inputBox">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Write your message here..."
          />
          {message.trim() !== '' && (
            <i className="text-[20px] mr-5 cursor-pointer" onClick={hitRequest}>
              <IoSend />
            </i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
