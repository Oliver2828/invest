// === src/components/ChatBot.jsx ===
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Predefined questions and answers
  const qna = [
    { 
      question: "What is the minimum investment?", 
      answer: "The minimum investment varies by plan. Our Starter Portfolio requires $500, while other plans start from $2,500." 
    },
    { 
      question: "How do I get started?", 
      answer: "Simply sign up, choose an investment plan that matches your goals, and make your first deposit. Our platform guides you through every step." 
    },
    { 
      question: "What are the fees?", 
      answer: "We charge a competitive 1% annual management fee on all assets under management. There are no hidden fees or commissions." 
    },
    { 
      question: "Is my money safe?", 
      answer: "Yes, all investments are protected by our $250,000 insurance policy. We use bank-level security and encryption to protect your data." 
    },
    { 
      question: "Can I withdraw my money?", 
      answer: "Withdrawal options vary by plan. Most plans allow withdrawals after the minimum duration period (12-36 months) with no penalties." 
    },
    { 
      question: "What returns can I expect?", 
      answer: "Returns vary based on your chosen plan and market conditions. Conservative plans average 4-7%, balanced 7-10%, and aggressive plans 10-30% annually." 
    }
  ];

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial bot message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          { text: "Hello! I'm your investment assistant. How can I help?", isUser: false }
        ]);
      }, 500);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Find matching answer
    setTimeout(() => {
      const cleanInput = inputValue.toLowerCase();
      const match = qna.find(item => 
        cleanInput.includes(item.question.toLowerCase().split(' ')[0]) ||
        item.question.toLowerCase().includes(cleanInput.split(' ')[0])
      );

      const botMessage = {
        text: match 
          ? match.answer 
          : "I'm sorry, I can help with common investment questions. Try asking about minimum investments, fees, or how to get started.",
        isUser: false
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="w-[320px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 text-white flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                <div className="ml-3">
                  <h3 className="font-bold">Investment Assistant</h3>
                  <p className="text-xs opacity-80">Online now</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 bg-gray-50 max-h-[300px] overflow-y-auto">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.isUser 
                        ? 'bg-red-100 text-gray-800 rounded-tr-none' 
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {qna.slice(0, 3).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(item.question)}
                    className="text-xs bg-white text-gray-700 px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-50"
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-gray-200 bg-white flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-r-lg hover:opacity-90"
              >
                Send
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;