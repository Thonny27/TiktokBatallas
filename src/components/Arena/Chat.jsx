import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chat({ messages, userRole, isBattleActive }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full relative pointer-events-none">
      {/* Fondo difuminado detrás del chat solo en Modo Solo */}
      {!isBattleActive && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent w-3/4 -left-4 mask-image-to-top pointer-events-none"></div>
      )}
      
      {/* Lista de Mensajes Flotantes */}
      <div className="flex-1 w-full h-full space-y-2 flex flex-col justify-end overflow-hidden mb-2 relative z-10">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[13px] flex items-start"
            >
              <div className={`rounded-xl px-2 py-1 inline-block max-w-[85%] break-words shadow-sm ${!isBattleActive ? 'bg-black/20 backdrop-blur-sm border border-white/5' : ''}`}>
                <span className={`font-bold mr-1 shrink-0 ${msg.type === 'vip' ? 'text-yellow-400' : 'text-gray-300'}`}>
                  {msg.type === 'vip' && <Star size={10} className="inline mr-1 text-yellow-500 mb-0.5" />}
                  {msg.user}:
                </span>
                <span className="text-white font-medium leading-tight">{msg.text}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
