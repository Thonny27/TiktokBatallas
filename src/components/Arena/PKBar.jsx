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
    <div className="w-full relative flex flex-col items-center justify-center pt-2">
      
      {/* Timer flotante CENTRADO ARRIBA */}
      <motion.div 
        animate={isSnipeTime ? { scale: [1, 1.1, 1], rotate: [0, -2, 2, 0] } : {}}
        transition={{ repeat: Infinity, duration: 1 }}
        className="bg-black/80 backdrop-blur-md rounded-full px-4 py-1 border border-white/10 shadow-lg z-40 flex items-center space-x-1 mb-1"
      >
        <Timer size={14} className={isSnipeTime ? 'text-red-500 animate-pulse' : 'text-gray-300'} />
        <span className={`font-mono text-xs tracking-widest font-black ${isSnipeTime ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </span>
      </motion.div>
      
      {/* Contenedor Principal de la Barra */}
      <div className="h-4 w-[96%] bg-black/60 rounded-full flex overflow-hidden border border-white/5 relative shadow-md">
         
         {/* Barra Izquierda (Host 1 - Cyan) */}
         <div 
           className="h-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] transition-all duration-700 ease-out relative flex items-center justify-start px-2" 
           style={{ width: `${score1Pct}%` }}
         >
         </div>

         {/* Barra Derecha (Host 2 - Pink) */}
         <div 
           className="h-full bg-gradient-to-l from-[#ff0844] to-[#ffb199] transition-all duration-700 ease-out relative flex items-center justify-end px-2" 
           style={{ width: `${100 - score1Pct}%` }}
         >
         </div>

         {/* Separador Central (VS Animado) */}
         <div 
           className="absolute top-0 bottom-0 w-8 transform -translate-x-1/2 z-10 transition-all duration-700 flex items-center justify-center" 
           style={{ left: `${score1Pct}%` }}
         >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.8)] border border-white/40 z-20">
              <span className="text-[9px] font-black italic text-black drop-shadow-sm">VS</span>
            </div>
            
            {/* Efecto de choque/fuego detrás del VS */}
            <div className="absolute inset-0 bg-yellow-400/30 blur-md rounded-full animate-pulse z-10"></div>
         </div>
      </div>

      {/* Puntuaciones CLARAMENTE VISIBLES */}
      <div className="w-[96%] flex justify-between absolute bottom-0 translate-y-1/2 px-2 pointer-events-none z-50">
        <div className="bg-black/60 rounded-md px-1.5 border border-cyan-500/50 backdrop-blur-sm">
          <span className="text-cyan-300 font-black text-[11px] drop-shadow-md">
            {score1.toLocaleString()}
          </span>
        </div>
        <div className="bg-black/60 rounded-md px-1.5 border border-pink-500/50 backdrop-blur-sm">
          <span className="text-pink-300 font-black text-[11px] drop-shadow-md">
            {score2.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
