import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MvpPanel({ onLogout, onOpenYape }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 space-y-6 h-full overflow-y-auto pb-24 no-scrollbar"
    >
      <div className="flex justify-between items-start">
         <div className="flex items-center bg-gray-800 p-3 rounded-2xl border border-pink-500/30 w-full relative overflow-hidden shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full border-2 border-gray-900 flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10 mr-3">
              <Star className="text-white fill-current" size={16} />
            </div>
            <div className="z-10 flex-1">
              <h2 className="text-base font-black text-white">El_Patron_Lima</h2>
              <p className="text-pink-400 text-[10px] font-bold drop-shadow-sm">Nivel 4: TITÁN DE BATALLAS</p>
            </div>
            <button onClick={onLogout} className="z-10 text-gray-500 hover:text-white text-xs font-bold transition-colors">Salir</button>
         </div>
      </div>
      
      <div className="bg-black/50 rounded-2xl p-5 border border-gray-700 text-center shadow-inner relative overflow-hidden">
        {/* Luces de fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none"></div>
        <p className="text-gray-500 text-[10px] font-bold uppercase mb-1 relative z-10">Saldo Disponible</p>
        <div className="flex justify-center items-center relative z-10">
          <span className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">🪙 12,400</span>
        </div>
        <button 
          onClick={onOpenYape}
          className="relative z-10 w-full mt-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
        >
           Recargar más Monedas (Yape)
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white text-xs font-bold">Progreso a Nivel 5</span>
          <span className="text-pink-500 text-[10px] font-bold">85%</span>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-700">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '85%' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-pink-500 to-yellow-500 h-full rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)] relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </motion.div>
        </div>
        <p className="text-gray-500 text-[10px] text-center mt-3">Envía <strong className="text-yellow-400">🪙 2,600</strong> más para desbloquear el Regalo Dragón.</p>
      </div>
    </motion.div>
  );
}
