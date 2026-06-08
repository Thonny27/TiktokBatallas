import React from 'react';
import { TrendingUp, DollarSign, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HostPanel({ onLogout }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 space-y-6 h-full overflow-y-auto pb-24 no-scrollbar"
    >
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)] mr-3 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Host_Pro&style=circle&backgroundColor=transparent" alt="Host" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">Anfitrión_Pro 🔥</h2>
            <p className="text-cyan-400 text-[10px] font-bold">Nivel: Creador Plata</p>
          </div>
        </div>
        <button onClick={onLogout} className="text-gray-500 hover:text-white text-sm font-bold bg-gray-800 px-3 py-1.5 rounded-lg transition-colors">Salir</button>
      </div>
      
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center">
          <TrendingUp className="mr-2" size={14} /> Ganancias (Diamantes)
        </h3>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">💎 45,500</span>
            <p className="text-gray-400 text-[10px] mt-1">
              Tu 70% Líquido: <strong className="text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">S/ 318.50</strong>
            </p>
          </div>
        </div>
        <button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black py-3 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)] text-sm flex justify-center items-center active:scale-[0.98] transition-all">
          <DollarSign size={16} className="mr-1" /> Solicitar Retiro a mi Yape
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <p className="text-gray-500 text-[10px] font-bold uppercase mb-3">Tus Mejores MVP</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm bg-gray-900 p-2 rounded-lg border border-gray-700/50">
            <span className="text-white flex items-center font-bold">
              <Trophy size={14} className="text-yellow-500 mr-2 drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]"/> 
              El_Patron_Lima
            </span>
            <span className="text-cyan-400 font-bold">25K 💎</span>
          </div>
          <div className="flex items-center justify-between text-sm bg-gray-900 p-2 rounded-lg border border-gray-700/50">
            <span className="text-white flex items-center font-bold">
              <Trophy size={14} className="text-gray-400 mr-2"/> 
              JuanP
            </span>
            <span className="text-cyan-400 font-bold">12K 💎</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
