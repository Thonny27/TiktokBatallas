import React from 'react';
import { X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GIFTS = [
  // Básicos
  { id: 'rosa', name: 'Rosa', emoji: '🌹', price: 1 },
  { id: 'cafe', name: 'Café', emoji: '☕', price: 10 },
  { id: 'dona', name: 'Dona', emoji: '🍩', price: 30 },
  { id: 'mando', name: 'Mando', emoji: '🎮', price: 50 },
  // Medios
  { id: 'skate', name: 'Skate', emoji: '🛹', price: 100 },
  { id: 'guitarra', name: 'Guitarra', emoji: '🎸', price: 250 },
  { id: 'corona', name: 'Corona', emoji: '👑', price: 500 },
  { id: 'diamante', name: 'Diamante', emoji: '💎', price: 800 },
  // Premium
  { id: 'cohete', name: 'Cohete VIP', emoji: '🚀', price: 1000, type: 'premium' },
  { id: 'ferrari', name: 'Ferrari', emoji: '🏎️', price: 5000, type: 'premium' },
  { id: 'ovni', name: 'OVNI', emoji: '🛸', price: 10000, type: 'premium' },
  // Dioses
  { id: 'leon', name: 'LEÓN SUPREMO', emoji: '🦁', price: 29000, type: 'premium' },
  { id: 'dragon', name: 'DRAGÓN GALÁCTICO', emoji: '🐉', price: 50000, type: 'premium' }
];

export default function GiftCatalogModal({ isOpen, onClose, onSendGift, onOpenYape, balance }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm pointer-events-auto">
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-gray-900 w-full h-[60%] rounded-t-3xl border-t border-gray-700 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] relative"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-white font-bold text-lg">Catálogo de Regalos</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex px-4 py-2 space-x-4 border-b border-gray-800 overflow-x-auto no-scrollbar">
              <button className="text-pink-500 font-bold border-b-2 border-pink-500 pb-1 text-sm whitespace-nowrap">🔥 Populares</button>
              <button className="text-gray-400 font-medium text-sm whitespace-nowrap hover:text-gray-200 transition-colors">✨ Animados Premium</button>
              <button className="text-gray-400 font-medium text-sm whitespace-nowrap hover:text-gray-200 transition-colors">🚀 Exclusivos</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-4 gap-4 no-scrollbar">
              <button onClick={() => onSendGift('normal', 1, '🌹')} className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 p-2 rounded-xl transition active:scale-95 group">
                <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">🌹</div>
                <span className="text-yellow-400 text-xs font-bold">1</span>
              </button>
              
              <button onClick={() => onSendGift('normal', 10, '🎮')} className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 p-2 rounded-xl transition active:scale-95 group">
                <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">🎮</div>
                <span className="text-yellow-400 text-xs font-bold">10</span>
              </button>
              
              <button onClick={() => onSendGift('normal', 99, '👑')} className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 p-2 rounded-xl transition active:scale-95 group">
                <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">👑</div>
                <span className="text-yellow-400 text-xs font-bold">99</span>
              </button>

              <button onClick={() => onSendGift('normal', 500, '🛹')} className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 p-2 rounded-xl transition active:scale-95 group">
                <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">🛹</div>
                <span className="text-yellow-400 text-xs font-bold">500</span>
              </button>
              
              <button onClick={() => onSendGift('premium', 10000, 'COHETE VIP')} className="flex flex-col items-center justify-center cursor-pointer bg-gradient-to-b from-pink-900/50 to-transparent p-2 rounded-xl border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)] col-span-2 active:scale-[0.98] transition hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                <div className="text-5xl mb-1 animate-pulse">🚀</div>
                <span className="text-[10px] text-pink-300 font-bold">COHETE VIP</span>
                <span className="text-yellow-400 text-xs font-bold mt-1">10,000</span>
              </button>
              
              <button onClick={() => onSendGift('premium', 29999, 'LEÓN SUPREMO')} className="flex flex-col items-center justify-center cursor-pointer bg-gradient-to-b from-purple-900/50 to-transparent p-2 rounded-xl border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] col-span-2 active:scale-[0.98] transition hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <div className="text-5xl mb-1 animate-bounce">🦁</div>
                <span className="text-[10px] text-purple-300 font-bold">LEÓN SUPREMO</span>
                <span className="text-yellow-400 text-xs font-bold mt-1">29,999</span>
              </button>
            </div>
            
            <div className="p-4 bg-gray-900 border-t border-gray-800 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-2">Saldo:</span>
                <span className="text-yellow-400 font-bold">🪙 {balance.toLocaleString()}</span>
              </div>
              <button onClick={() => { onClose(); onOpenYape(); }} className="text-pink-500 text-sm font-bold flex items-center hover:text-pink-400 transition-colors">
                Recargar <Zap size={14} className="ml-1" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
