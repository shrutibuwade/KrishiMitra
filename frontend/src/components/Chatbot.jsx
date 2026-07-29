import React, { useEffect, useState } from 'react';

const Chatbot = () => {
  const [isOllamaRunning, setIsOllamaRunning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'नमस्ते! 👋 मैं KrishiMitra सहायक हूँ। कृषि के बारे में कोई भी प्रश्न पूछें। (Hello! Ask me about farming in Hindi or English)', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // ✅ CHECK OLLAMA STATUS
  const checkOllamaStatus = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/ollama/status');
      const data = await response.json();
      
      console.log('🤖 Ollama status:', data);
      setIsOllamaRunning(data.isRunning);
    } catch (error) {
      console.error('❌ Error checking Ollama:', error);
      setIsOllamaRunning(false);
    } finally {
      setInitialLoading(false);
    }
  };

  // ✅ CHECK ON MOUNT
  useEffect(() => {
    checkOllamaStatus();
    
    // ✅ CHECK EVERY 5 SECONDS
    const interval = setInterval(checkOllamaStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // ✅ SEND MESSAGE
  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInputValue('');
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/api/chatbot/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: inputValue,
            language: language
          })
        });

        const data = await response.json();

        const botMessage = {
          id: Date.now() + 1,
          text: data.message || 'Sorry, I couldn\'t understand that.',
          sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        const errorMessage = {
          id: Date.now() + 1,
          text: 'Error connecting to chatbot. Make sure Ollama is running on localhost:11434',
          sender: 'bot'
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  // ✅ SINGLE RETURN WITH CONDITIONAL RENDERING
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      fontFamily: 'inherit'
    }}>
      {/* BUTTON - ALWAYS VISIBLE WHEN NOT OPEN */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2d5016 0%, #1a3d0a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 16px rgba(45, 80, 22, 0.35)',
            transition: 'all 0.3s ease'
          }}
        >
          💬
        </button>
      )}

      {/* CHATBOT WINDOW - OPENS WHEN isOpen IS TRUE */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '380px',
          height: '540px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 5px 40px rgba(0, 0, 0, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10000
        }}>
          {/* HEADER */}
          <div style={{
            background: 'linear-gradient(135deg, #2d5016 0%, #1a3d0a 100%)',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px 12px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
              🤖 {isOllamaRunning ? 'Chatbot' : 'Ollama Starting...'}
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                padding: 0
              }}
            >
              ✕
            </button>
          </div>

          {/* STATUS CHECK */}
          {initialLoading && (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#666'
            }}>
              ⏳ Checking Ollama status...
            </div>
          )}

          {!initialLoading && !isOllamaRunning && (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <p>🤖 Ollama is starting up...</p>
              <p style={{ fontSize: '12px', color: '#999' }}>Please wait for the chatbot to become available.</p>
              <button 
                onClick={checkOllamaStatus}
                style={{
                  padding: '8px 16px',
                  background: '#2d5016',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                🔄 Retry
              </button>
            </div>
          )}

          {/* MESSAGES */}
          {!initialLoading && isOllamaRunning && (
            <>
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                background: '#fafafa'
              }}>
                {messages.map(msg => (
                  <div 
                    key={msg.id} 
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <span style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      maxWidth: '85%',
                      background: msg.sender === 'user' ? '#2d5016' : 'white',
                      color: msg.sender === 'user' ? 'white' : '#333',
                      border: msg.sender === 'bot' ? '1px solid #ddd' : 'none'
                    }}>
                      {msg.text}
                    </span>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <span style={{ color: '#999', fontSize: '12px' }}>🤖 Thinking...</span>
                  </div>
                )}
              </div>

              {/* INPUT */}
              <div style={{
                display: 'flex',
                gap: '8px',
                padding: '12px 16px',
                borderTop: '1px solid #eee',
                background: 'white',
                borderRadius: '0 0 12px 12px'
              }}>
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'अपना प्रश्न पूछें...' : 'Ask your question...'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !loading && handleSendMessage()}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={loading}
                  style={{
                    width: '36px',
                    height: '36px',
                    background: loading ? '#ccc' : '#2d5016',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;