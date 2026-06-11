import React from 'react';
import { Timer, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PKBar({ score1, score2, score3 = 0, score4 = 0, battleType = 2, timeLeft }) {
  const isSnipeTime = timeLeft <= 60 && timeLeft > 0;
  
  let totalScore = score1 + score2;
  if (battleType >= 3) totalScore += score3;
  if (battleType >= 4) totalScore += score4;
  totalScore = totalScore || 1; 

  const getPct = (score) => {
    if (score1 === 0 && score2 === 0 && score3 === 0 && score4 === 0) {
      return 100 / battleType;
    }
    return Math.max(0, Math.min(100, (score / totalScore) * 100));
  };

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
      <div className="h-6 w-[96%] bg-black/60 rounded-full flex overflow-hidden border border-white/5 relative shadow-md">
         
         {/* Barra Izquierda (Host 1 - Cyan) */}
         <div 
           className="h-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] transition-all duration-700 ease-out relative flex items-center justify-center overflow-hidden" 
           style={{ width: `${getPct(score1)}%` }}
         >
           <span className="text-white font-black text-[11px] drop-shadow-md px-1">{score1.toLocaleString()}</span>
         </div>

         {/* Barra 2 (Host 2 - Pink) */}
         <div 
           className="h-full bg-gradient-to-l from-[#ff0844] to-[#ffb199] transition-all duration-700 ease-out relative border-l border-white/20 flex items-center justify-center overflow-hidden" 
           style={{ width: `${getPct(score2)}%` }}
         >
           <span className="text-white font-black text-[11px] drop-shadow-md px-1">{score2.toLocaleString()}</span>
         </div>

         {/* Barra 3 (Host 3 - Orange) */}
         {battleType >= 3 && (
           <div 
             className="h-full bg-gradient-to-l from-orange-500 to-yellow-400 transition-all duration-700 ease-out relative border-l border-white/20 flex items-center justify-center overflow-hidden" 
             style={{ width: `${getPct(score3)}%` }}
           >
             <span className="text-white font-black text-[11px] drop-shadow-md px-1">{score3.toLocaleString()}</span>
           </div>
         )}

         {/* Barra 4 (Host 4 - Purple) */}
         {battleType >= 4 && (
           <div 
             className="h-full bg-gradient-to-l from-purple-500 to-indigo-400 transition-all duration-700 ease-out relative border-l border-white/20 flex items-center justify-center overflow-hidden" 
             style={{ width: `${getPct(score4)}%` }}
           >
             <span className="text-white font-black text-[11px] drop-shadow-md px-1">{score4.toLocaleString()}</span>
           </div>
         )}

         {/* Separador Central (VS Animado) SOLO para 2 hosts */}
         {battleType === 2 && (
           <div 
             className="absolute top-0 bottom-0 w-8 transform -translate-x-1/2 z-10 transition-all duration-700 flex items-center justify-center" 
             style={{ left: `${getPct(score1)}%` }}
           >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.8)] border border-white/40 z-20">
                <span className="text-[9px] font-black italic text-black drop-shadow-sm">VS</span>
              </div>
              
              {/* Efecto de choque/fuego detrás del VS */}
              <div className="absolute inset-0 bg-yellow-400/30 blur-md rounded-full animate-pulse z-10"></div>
           </div>
         )}
      </div>
    </div>
  );
}
