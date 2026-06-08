import React from 'react';
import { Timer, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PKBar({ score1, score2, timeLeft }) {
  const isSnipeTime = timeLeft <= 60 && timeLeft > 0;
  const totalScore = score1 + score2 || 1; 
  const score1Pct = Math.max(5, Math.min(95, (score1 / totalScore) * 100));

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="relative w-full px-1 z-30">
      
      {/* Timer flotante */}
      <motion.div 
        animate={isSnipeTime ? { scale: [1, 1.1, 1], rotate: [0, -2, 2, 0] } : {}}
        transition={{ repeat: Infinity, duration: 1 }}
        className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-full px-3 py-1 border border-white/10 shadow-lg z-40 flex items-center space-x-1"
      >
        <Timer size={12} className={isSnipeTime ? 'text-red-500 animate-pulse' : 'text-gray-300'} />
        <span className={`font-mono text-xs tracking-widest font-black ${isSnipeTime ? 'text-red-500 animate-pulse drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </span>
      </motion.div>
      
      {/* Contenedor Principal de la Barra */}
      <div className="h-4 w-full bg-black/60 rounded-full flex overflow-hidden border border-white/5 relative shadow-md">
         
         {/* Barra Izquierda (Host 1 - Cyan) */}
         <div 
           className="h-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] transition-all duration-700 ease-out flex items-center justify-start relative" 
           style={{ width: `${score1Pct}%` }}
         >
         </div>

         {/* Barra Derecha (Host 2 - Pink) */}
         <div 
           className="h-full bg-gradient-to-l from-[#ff0844] to-[#ffb199] transition-all duration-700 ease-out flex items-center justify-end relative" 
           style={{ width: `${100 - score1Pct}%` }}
         >
         </div>

         {/* Separador Central */}
         <div 
           className="absolute top-0 bottom-0 w-2 transform -translate-x-1/2 z-10 transition-all duration-700 flex items-center justify-center" 
           style={{ left: `${score1Pct}%` }}
         >
            <div className="w-1 h-8 bg-yellow-400 transform -skew-x-[20deg] shadow-[0_0_10px_rgba(250,204,21,1)]"></div>
         </div>
      </div>

      {/* Puntuaciones */}
      <div className="flex justify-between mt-1 px-2 relative z-20">
        <span className="text-cyan-300 font-black text-[10px] drop-shadow-md tracking-wide">
          {score1.toLocaleString()}
        </span>
        <span className="text-pink-300 font-black text-[10px] drop-shadow-md tracking-wide">
          {score2.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
