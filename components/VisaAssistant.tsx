
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Headset } from 'lucide-react';
import { getVisaAssistance } from '../services/geminiService';

const VisaAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: 'Namaste! I am Aria, your e-Visa Virtual Assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    const botResponse = await getVisaAssistance(userMessage);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Launcher Button matching 'Chat with Vani' style */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-24 h-24 bg-blue-50 rounded-full shadow-2xl flex items-center justify-center group relative border-4 border-blue-400 overflow-hidden"
      >
        <div className="flex flex-col items-center">
           <div className="bg-blue-600 rounded-full p-2 mb-1">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=aria&backgroundColor=b6e3f4" alt="Vani" className="w-12 h-12" />
           </div>
           <span className="text-[8px] font-bold text-blue-900 uppercase leading-none text-center px-1">CHAT WITH ARIA</span>
        </div>
        {isOpen && (
           <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
             <X className="w-6 h-6 text-red-600" />
           </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-28 right-0 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden animate-slideUp">
          <div className="bg-[#1e88e5] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=aria" alt="Aria" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Aria Assistant</h3>
                <p className="text-[10px] text-blue-100">Live Support</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-[12px] shadow-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#1e88e5] text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border p-3 rounded-xl rounded-tl-none text-[10px] text-gray-400">
                  Aria is typing...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t flex gap-2 bg-white">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-grow border rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="w-10 h-10 bg-[#1e88e5] text-white rounded-lg flex items-center justify-center hover:bg-blue-800 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaAssistant;
