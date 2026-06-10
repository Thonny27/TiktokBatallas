import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chat({ messages, userRole, isBattleActive }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full relative pointer-events-auto flex flex-col justify-end">
      {/* Fondo difuminado detrás del chat solo en Modo Solo */}
      {!isBattleActive && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent w-3/4 -left-4 mask-image-to-top pointer-events-none"></div>
      )}
      
      {/* Lista de Mensajes Flotantes */}
      <div 
        className="w-full max-h-[160px] overflow-y-auto no-scrollbar relative z-10 flex flex-col"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)' }}
      >
        <div className="mt-auto flex flex-col space-y-2 pb-2">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[13px] flex items-start"
              >
                <div className={`rounded-xl px-2 py-1 inline-block max-w-[85%] break-words shadow-sm 
                  ${!isBattleActive ? 'bg-black/20 backdrop-blur-sm border border-white/5' : ''} 
                  ${msg.artifact ? `bg-gradient-to-r ${msg.artifact.colors} bg-opacity-20 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]` : ''}
                `}>
                  <span className={`font-bold mr-1 shrink-0 ${msg.type === 'vip' ? (msg.artifact ? 'text-white' : 'text-yellow-400') : 'text-gray-300'}`}>
                    {msg.artifact ? (
                      <span className="inline-flex items-center justify-center mr-1 bg-black/40 rounded border border-white/10 px-1 py-0.5 overflow-hidden">
                        {msg.artifact.image ? (
                          <img src={msg.artifact.image} alt={msg.artifact.name} className="w-3 h-3 object-contain" />
                        ) : (
                          <span className="text-[10px] leading-none drop-shadow-md">{msg.artifact.icon}</span>
                        )}
                      </span>
                    ) : msg.type === 'vip' ? (
                      <Star size={10} className="inline mr-1 text-yellow-500 mb-0.5" />
                    ) : null}
                    <span className={msg.artifact && msg.artifact.id > 3 ? 'text-cyan-200' : ''}>{msg.user}</span>:
                  </span>
                  <span className="text-white font-medium leading-tight">{msg.text}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}
