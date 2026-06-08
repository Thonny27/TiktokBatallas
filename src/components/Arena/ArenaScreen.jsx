import React, { useState } from 'react';
import { Eye, Gift, Share2, MoreHorizontal, AlertTriangle, Plus, Send } from 'lucide-react';
import PKBar from './PKBar';
import Chat from './Chat';
import GiftOverlay from './GiftOverlay';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArenaScreen({ 
  userRole, 
  onOpenGiftModal, 
  onOpenYape, 
  balance,
  timeLeft,
  isBattleActive,
  score1,
  score2,
  isGiantGiftActive,
  smallGifts,
  hearts,
  tapCombo,
  onScreenTap,
  chatMessages,
  onSendMessage,
  onAddScore
}) {
  const isSnipeTime = timeLeft <= 60 && timeLeft > 0;

  return (
    <div className="relative flex flex-col h-full bg-black overflow-hidden select-none" onClick={(e) => {
      onScreenTap(e);
      if (isBattleActive) onAddScore(1);
    }}>
      
      {/* CAPA INVISIBLE EXCLUSIVA PARA CAPTURAR TAPS (Evita bloqueos) */}
      <div className="absolute inset-0 z-10 cursor-pointer pointer-events-auto"></div>

      {/* =========================================
          1. HEADER (Espacio Superior - ABSOLUTE)
          ========================================= */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-start px-4 pt-6 pb-2 pointer-events-none">
        <div className="flex items-center space-x-2">
          {/* Host Profile Píldora */}
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full pr-2 pl-1 py-1 border border-white/10 pointer-events-auto shadow-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 mr-2">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Host_Pro&style=circle" className="w-full h-full bg-gray-900 rounded-full" alt="host1" />
            </div>
            <div className="flex flex-col mr-3">
              <span className="text-white font-bold text-[10px] leading-tight">Anfitrión_Pro</span>
              <span className="text-gray-300 text-[8px]">1.2M Likes</span>
            </div>
            <button className="bg-pink-600 text-white rounded-full p-1 shadow-md hover:bg-pink-500 transition-colors">
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* Espectadores */}
        <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10 pointer-events-auto">
          <Eye size={12} className="text-gray-300 mr-1.5" />
          <span className="text-white font-bold text-[11px]">1.2K</span>
        </div>
      </div>

      {/* =========================================
          CONTENIDO DINÁMICO
          ========================================= */}
      {isBattleActive ? (
        <>
          {/* 2. BARRA PK (Flotando debajo del header - ABSOLUTE) */}
          <div className="absolute top-[65px] left-0 w-full z-40 pointer-events-none">
            <PKBar score1={score1} score2={score2} timeLeft={timeLeft} />
          </div>

          {/* 3. VIDEOS (Mitad de pantalla en PK Mode, espaciados para no tapar header/pkbar) */}
          <div className="flex w-full h-[55%] shrink-0 pointer-events-none relative z-20 pt-[115px]">
            <div className="w-1/2 relative bg-gray-900 border-r border-black flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 to-transparent"></div>
              <div className="w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl absolute animate-[pulse_4s_ease-in-out_infinite]"></div>
              <span className="text-cyan-400/50 font-bold text-sm z-10 drop-shadow-lg">VIDEO HOST 1</span>
            </div>
            <div className="w-1/2 relative bg-gray-900 border-l border-black flex flex-col items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/40 to-transparent"></div>
               <div className="absolute top-2 right-2 z-20">
                <span className="bg-black/60 backdrop-blur-md rounded-full px-2 py-0.5 text-white font-bold text-[10px] border border-pink-500/30 shadow-md">Host_Rival99</span>
              </div>
              <div className="w-48 h-48 rounded-full bg-pink-500/20 blur-3xl absolute animate-[pulse_3s_ease-in-out_infinite]"></div>
              <span className="text-pink-400/50 font-bold text-sm z-10 drop-shadow-lg">VIDEO HOST 2</span>
            </div>
          </div>
        </>
      ) : (
        /* MODO SOLO (Video ocupa todo el fondo absoluto) */
        <div className="absolute inset-0 w-full h-full bg-gray-900 flex flex-col items-center justify-center pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-transparent"></div>
          <div className="w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl absolute animate-[pulse_4s_ease-in-out_infinite]"></div>
          <span className="text-white/50 font-bold text-lg z-10 drop-shadow-lg">PANTALLA COMPLETA</span>
        </div>
      )}

      {/* =========================================
          4. ZONA INFERIOR: CHAT, ANIMACIONES Y BOTONES
          ========================================= */}
      <div className={`flex-1 min-h-0 w-full flex flex-col justify-end pointer-events-none z-30 pb-4 relative ${!isBattleActive ? 'bg-gradient-to-t from-black via-black/50 to-transparent' : ''}`}>
        
        {/* Lluvia de corazones (Tap Tap) */}
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div 
              key={heart.id} 
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 0, y: -400, x: heart.driftX, scale: 1.8, rotate: heart.driftX }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute text-5xl pointer-events-none z-50 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" 
              style={{ left: heart.x - 25, bottom: 200 + heart.y }}
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Combo Multiplier Flotante */}
        <AnimatePresence>
          {tapCombo > 5 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, rotate: -10 }}
              animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              key={tapCombo}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute bottom-1/3 left-4 z-50 pointer-events-none"
            >
              <div className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-[0_0_20px_rgba(250,204,21,1)]">
                {tapCombo}x
              </div>
              <div className="text-[12px] text-yellow-300 font-bold uppercase tracking-widest mt-[-5px] drop-shadow-lg">Combo</div>
            </motion.div>
          )}
        </AnimatePresence>

        <GiftOverlay isGiantGiftActive={isGiantGiftActive} smallGifts={smallGifts} />

        {/* Chat Component (Ahora dinámico) */}
        <div className="w-full px-4 mb-2 flex-1 flex flex-col justify-end min-h-0 overflow-hidden">
           <AnimatePresence>
            {isSnipeTime && isBattleActive && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex justify-center mb-2"
              >
                <div className="bg-gradient-to-r from-red-600 via-pink-600 to-yellow-500 text-white font-black italic px-4 py-1 rounded-full border border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.6)] text-sm flex items-center animate-pulse">
                  <AlertTriangle size={16} className="mr-1" /> ¡x2 PUNTOS!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Chat messages={chatMessages} userRole={userRole} isBattleActive={isBattleActive} />
        </div>
        
        {/* BOTONERA TIKTOK CLON EXACTO */}
        <div className="w-full px-3 flex items-center justify-between pointer-events-auto space-x-2 shrink-0">
          
          {/* Input de Chat Estilo Píldora Minimalista */}
          <div className="flex-1">
            <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/5 flex items-center pl-4 pr-1 py-1 w-full">
              <input 
                id="chat-input-mobile"
                type="text"
                placeholder="Type..."
                className="bg-transparent text-white text-[13px] w-full outline-none placeholder-gray-400 font-medium py-1.5"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    onSendMessage(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const input = document.getElementById('chat-input-mobile');
                  if (input && input.value.trim()) {
                    onSendMessage(input.value);
                    input.value = '';
                  }
                }}
                className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center flex-shrink-0 hover:bg-pink-500 transition-colors active:scale-95 shadow-md"
              >
                <Send size={14} className="text-white ml-0.5" />
              </button>
            </div>
          </div>

          {/* Iconos de Acción Derecha */}
          <div className="flex items-center space-x-2.5">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddScore(1); // Suma 1 a la barra directamente
                onSendMessage("Ha enviado una 🌹");
              }}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/5 hover:bg-black/60 transition active:scale-95"
            >
              <span className="text-[16px]">🌹</span>
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); onOpenGiftModal(); }}
              className="w-9 h-9 rounded-full bg-[#ff2a5f] flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,42,95,0.4)] hover:scale-105 transition-all relative group"
            >
              <Gift size={18} className="fill-current text-white drop-shadow-md" />
              <span className="absolute -top-3 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow border border-white/20">REGALO</span>
            </button>

            <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/5 hover:bg-black/60 transition active:scale-95">
              <Share2 size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
