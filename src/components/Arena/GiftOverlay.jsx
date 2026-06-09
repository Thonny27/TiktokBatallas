import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GiftOverlay({ isGiantGiftActive, smallGifts }) {
  return (
    <>
      {/* Regalos Pequeños (Banners) */}
      <div className="flex flex-col w-full absolute bottom-[300px] left-4 space-y-2 z-30 pointer-events-none">
        <AnimatePresence>
          {smallGifts.map(gift => (
            <motion.div
              key={gift.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-cyan-900/90 to-transparent border-l-2 border-cyan-400 rounded-r-full px-3 py-1 flex items-center shadow-lg w-[70%]"
            >
              <div className="w-8 h-8 rounded-full bg-gray-800 border border-yellow-400 mr-2 overflow-hidden shrink-0">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${gift.id}`} alt="av" className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[10px] font-bold">Un_MVP</span>
                <span className="text-yellow-400 text-[10px]">Envió {gift.emoji}</span>
              </div>
              <span className="ml-auto text-2xl">{gift.emoji}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Regalo Gigante Animado (Invasivo) */}
      <AnimatePresence>
        {isGiantGiftActive && isGiantGiftActive.video ? (
          // VIDEO ÉPICO (Formato MP4/WebM)
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden"
          >
            {/* Fondo semi-oscuro para resaltar el video */}
            <div className="absolute inset-0 bg-black/60"></div>
            
            <motion.div
              initial={{ scale: 0.8, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              className="absolute top-[15%] text-white font-black text-2xl z-50 italic drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-center w-full px-4"
            >
              <span className="text-yellow-400">Un_MVP</span> invocó<br/>
              <span className="text-3xl text-cyan-400">{isGiantGiftActive.name}</span>!
            </motion.div>

            {/* Reproductor de Video con mix-blend-screen para volver transparente el fondo negro */}
            <video 
              src={isGiantGiftActive.video} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover mix-blend-screen"
            />
          </motion.div>
        ) : isGiantGiftActive && (
          // REGALOS GIGANTES NORMALES
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.8, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              className="absolute top-1/4 text-white font-black text-2xl z-50 italic animate-pulse drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-center w-full px-4"
            >
              ¡Un MVP envió {isGiantGiftActive.name}!
            </motion.div>

            <motion.div
              initial={{ y: "100vh", scale: 0.5, opacity: 0 }}
              animate={{
                y: ["100vh", "0vh", "-10vh", "-50vh"],
                scale: [0.5, 1.2, 1.5, 2],
                opacity: [0, 1, 1, 0],
                filter: [
                  "drop-shadow(0 0 0px rgba(255,255,255,0))",
                  "drop-shadow(0 0 50px rgba(255,255,255,0.8))",
                  "drop-shadow(0 0 100px rgba(255,255,255,1))",
                  "drop-shadow(0 0 100px rgba(255,255,255,0))"
                ]
              }}
              transition={{ duration: 4, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
              className="text-[150px] absolute bottom-0"
            >
              {isGiantGiftActive.emoji}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
