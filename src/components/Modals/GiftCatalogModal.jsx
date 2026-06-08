import React from 'react';
import { X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GIFTS = [
  // Básicos (1 - 10)
  { id: 'rosa', name: 'Rosa', emoji: '🌹', price: 1 },
  { id: 'corazon', name: 'Corazón', emoji: '❤️', price: 1 },
  { id: 'chile', name: 'Chile', emoji: '🌶️', price: 1 },
  { id: 'tiktok', name: 'TikTok', emoji: '🎵', price: 1 },
  { id: 'beso', name: 'Beso', emoji: '💋', price: 5 },
  { id: 'helado', name: 'Helado', emoji: '🍦', price: 5 },
  { id: 'pesa', name: 'Pesa', emoji: '🏋️‍♂️', price: 5 },
  { id: 'cafe', name: 'Café', emoji: '☕', price: 10 },
  { id: 'dona', name: 'Dona', emoji: '🍩', price: 10 },
  { id: 'microfono', name: 'Micrófono', emoji: '🎤', price: 10 },
  
  // Medios (20 - 99)
  { id: 'oso', name: 'Oso', emoji: '🧸', price: 20 },
  { id: 'mando', name: 'Mando', emoji: '🎮', price: 50 },
  { id: 'gato', name: 'Gato', emoji: '🐱', price: 50 },
  { id: 'sombrero', name: 'Sombrero', emoji: '🎩', price: 50 },
  { id: 'pizza', name: 'Pizza', emoji: '🍕', price: 50 },
  { id: 'anillo', name: 'Anillo', emoji: '💍', price: 99 },
  { id: 'zapatillas', name: 'Zapatillas', emoji: '👟', price: 99 },
  { id: 'corona', name: 'Corona', emoji: '👑', price: 99 },

  // Altos (100 - 999)
  { id: 'skate', name: 'Skate', emoji: '🛹', price: 100 },
  { id: 'balon', name: 'Balón', emoji: '⚽', price: 150 },
  { id: 'trofeo', name: 'Trofeo', emoji: '🏆', price: 200 },
  { id: 'guitarra', name: 'Guitarra', emoji: '🎸', price: 250 },
  { id: 'moto', name: 'Moto', emoji: '🏍️', price: 300 },
  { id: 'coche', name: 'Coche', emoji: '🚗', price: 500 },
  { id: 'yate', name: 'Yate', emoji: '🛥️', price: 800 },
  { id: 'diamante', name: 'Diamante', emoji: '💎', price: 999 },

  // Premium (1000+)
  { id: 'cohete', name: 'Cohete VIP', emoji: '🚀', price: 1000, type: 'premium' },
  { id: 'unicornio', name: 'Unicornio', emoji: '🦄', price: 2500, type: 'premium' },
  { id: 'castillo', name: 'Castillo', emoji: '🏰', price: 3000, type: 'premium' },
  { id: 'ferrari', name: 'Ferrari', emoji: '🏎️', price: 5000, type: 'premium' },
  { id: 'ovni', name: 'OVNI', emoji: '🛸', price: 10000, type: 'premium' },
  { id: 'leon', name: 'LEÓN SUPREMO', emoji: '🦁', price: 29999, type: 'premium' },
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
            
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-4 gap-4 no-scrollbar pb-10">
              {GIFTS.map((gift) => (
                gift.type === 'premium' ? (
                  <button 
                    key={gift.id}
                    onClick={() => onSendGift('premium', gift.price, `${gift.emoji} ${gift.name}`)} 
                    className="flex flex-col items-center justify-center cursor-pointer bg-gradient-to-b from-purple-900/50 to-transparent p-2 rounded-xl border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] col-span-2 active:scale-[0.98] transition hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] group"
                  >
                    <div className="text-4xl mb-1 animate-pulse">{gift.emoji}</div>
                    <span className="text-[10px] text-purple-300 font-bold truncate w-full text-center px-1">{gift.name}</span>
                    <span className="text-yellow-400 text-xs font-bold mt-1">{gift.price.toLocaleString()}</span>
                  </button>
                ) : (
                  <button 
                    key={gift.id}
                    onClick={() => onSendGift('normal', gift.price, gift.emoji)} 
                    className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 p-2 rounded-xl transition active:scale-95 group"
                  >
                    <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">{gift.emoji}</div>
                    <span className="text-yellow-400 text-xs font-bold">{gift.price}</span>
                  </button>
                )
              ))}
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
