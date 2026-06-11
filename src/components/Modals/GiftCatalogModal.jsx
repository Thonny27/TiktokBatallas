import React, { useState, useRef } from 'react';
import { X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentTierIndex, TIERS } from '../../utils/tiers';

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
  { id: 'mando', name: 'Mando', emoji: '🎮', price: 50, requiredTier: 4 },
  { id: 'gato', name: 'Gato', emoji: '🐱', price: 50 },
  { id: 'sombrero', name: 'Sombrero', emoji: '🎩', price: 50, requiredTier: 4 },
  { id: 'pizza', name: 'Pizza', emoji: '🍕', price: 50, requiredTier: 5 },
  { id: 'anillo', name: 'Anillo', emoji: '💍', price: 99 },
  { id: 'zapatillas', name: 'Zapatillas', emoji: '👟', price: 99 },
  { id: 'corona', name: 'Corona', emoji: '👑', price: 99, requiredTier: 6 },

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
  { id: 'ferrari', name: 'Ferrari', emoji: '🏎️', price: 5000, type: 'premium', requiredTier: 5 },
  { id: 'ovni', name: 'OVNI', emoji: '🛸', price: 10000, type: 'premium', requiredTier: 6 },
  { id: 'leon', name: 'LEÓN SUPREMO', emoji: '🦁', price: 29999, type: 'premium', requiredTier: 7 },
  { id: 'dragon', name: 'DRAGÓN GALÁCTICO', emoji: '🐉', price: 50000, type: 'premium', requiredTier: 8 },
  { id: 'caballero', name: 'CABALLERO CELESTIAL', image: '/images/tiers/exclusive/caballero_alado.png', video: '/exclusive/angel_video.mp4', price: 99999, type: 'premium', isEpic: true }
];

export default function GiftCatalogModal({ isOpen, onClose, onSendGift, onOpenYape, balance, totalGiftsSent = 0 }) {
  const [comboState, setComboState] = useState({ id: null, count: 0 });
  const [activeTab, setActiveTab] = useState('populares');
  const comboTimeoutRef = useRef(null);

  const currentTier = getCurrentTierIndex(totalGiftsSent);
  const isCaballeroUnlocked = currentTier >= 8; // Index 8 is 'Trono de Leyenda'
  const isExclusivosVisible = currentTier >= 4; // Index 4 is 'Estandarte del Clan'

  const handleGiftClick = (gift) => {
    if (gift.id === 'caballero' && !isCaballeroUnlocked) {
      return;
    }

    if (gift.requiredTier !== undefined && currentTier < gift.requiredTier) {
      return;
    }

    if (balance < gift.price) {
      alert("Saldo insuficiente");
      return;
    }
    
    // Enviar el regalo
    onSendGift(gift);

    if (gift.type === 'premium') {
      onClose();
      return;
    }

    // Actualizar combo
    setComboState(prev => ({
      id: gift.id,
      count: prev.id === gift.id ? prev.count + 1 : 1
    }));

    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    comboTimeoutRef.current = setTimeout(() => {
      setComboState({ id: null, count: 0 });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm pointer-events-auto">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-gray-900 w-full h-[50%] rounded-t-3xl border-t border-gray-700 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] relative"
          >
            <div className="flex justify-between items-center p-3 border-b border-gray-800 shrink-0">
              <h3 className="text-white font-bold text-lg">Catálogo de Regalos</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>

            <div className="flex px-3 py-2 space-x-4 border-b border-gray-800 overflow-x-auto no-scrollbar shrink-0">
              <button 
                onClick={() => setActiveTab('populares')}
                className={`${activeTab === 'populares' ? 'text-pink-500 border-b-2 border-pink-500 pb-1' : 'text-gray-400 hover:text-gray-200'} font-bold text-sm whitespace-nowrap transition-colors`}
              >
                🔥 Populares
              </button>
              <button 
                onClick={() => setActiveTab('premium')}
                className={`${activeTab === 'premium' ? 'text-pink-500 border-b-2 border-pink-500 pb-1' : 'text-gray-400 hover:text-gray-200'} font-bold text-sm whitespace-nowrap transition-colors`}
              >
                ✨ Animados Premium
              </button>
              {isExclusivosVisible && (
                <button 
                  onClick={() => setActiveTab('exclusivos')}
                  className={`${activeTab === 'exclusivos' ? 'text-pink-500 border-b-2 border-pink-500 pb-1' : 'text-gray-400 hover:text-gray-200'} font-bold text-sm whitespace-nowrap transition-colors`}
                >
                  🚀 Exclusivos
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-3 grid grid-cols-4 gap-2 no-scrollbar pb-6">
              {GIFTS.filter(g => {
                if (activeTab === 'populares') return !g.type;
                if (activeTab === 'premium') return g.type === 'premium' && !g.isEpic;
                if (activeTab === 'exclusivos') return g.isEpic;
                return false;
              }).map((gift) => (
                gift.type === 'premium' ? (
                  <button
                    key={gift.id}
                    onClick={() => handleGiftClick(gift)}
                    className={`flex flex-col items-center justify-center cursor-pointer p-2 rounded-xl border col-span-2 active:scale-[0.98] transition group relative ${
                      (gift.requiredTier !== undefined && currentTier < gift.requiredTier) || (!isCaballeroUnlocked && gift.id === 'caballero')
                        ? 'grayscale opacity-50 bg-gray-800 border-gray-600 pointer-events-auto' 
                        : gift.isEpic 
                          ? 'bg-gradient-to-b from-yellow-900/50 to-transparent border-yellow-500/50 shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_25px_rgba(250,204,21,0.6)]' 
                          : 'bg-gradient-to-b from-purple-900/50 to-transparent border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                    }`}
                  >
                    {(!isCaballeroUnlocked && gift.id === 'caballero') ? (
                      <div className="absolute inset-0 z-10 bg-black/60 rounded-xl flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl">🔒</span>
                        <span className="text-[8px] text-gray-300 font-bold mt-1 text-center leading-tight">Requiere<br/>Trono de Leyenda</span>
                      </div>
                    ) : gift.requiredTier !== undefined && currentTier < gift.requiredTier && (
                      <div className="absolute inset-0 z-10 bg-black/60 rounded-xl flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl">🔒</span>
                        <span className="text-[8px] text-gray-300 font-bold mt-1 text-center leading-tight">Nivel<br/>{TIERS[gift.requiredTier].name.split(' ')[0]}</span>
                      </div>
                    )}
                    <div className="text-4xl mb-1 animate-pulse h-10 flex items-center justify-center">
                      {gift.image ? <img src={gift.image} alt={gift.name} className="h-full object-contain rounded-md drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" /> : gift.emoji}
                    </div>
                    <span className={`text-[10px] font-bold truncate w-full text-center px-1 ${gift.isEpic ? 'text-yellow-300' : 'text-purple-300'}`}>{gift.name}</span>
                    <span className="text-yellow-400 text-xs font-bold mt-1">{gift.price.toLocaleString()}</span>
                    {comboState.id === gift.id && comboState.count > 0 && (
                      <motion.div 
                        initial={{ scale: 0.5, y: 10, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        key={comboState.count}
                        className="absolute -top-3 -right-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white font-black text-xs px-2 py-0.5 rounded-full border border-yellow-200 shadow-lg z-20"
                      >
                        x{comboState.count}
                      </motion.div>
                    )}
                  </button>
                ) : (
                  <button
                    key={gift.id}
                    onClick={() => handleGiftClick(gift)}
                    className={`flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 p-2 rounded-xl transition active:scale-95 group relative ${gift.requiredTier !== undefined && currentTier < gift.requiredTier ? 'grayscale opacity-50 bg-gray-800 pointer-events-auto' : ''}`}
                  >
                    {gift.requiredTier !== undefined && currentTier < gift.requiredTier && (
                      <div className="absolute inset-0 z-10 bg-black/60 rounded-xl flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xl">🔒</span>
                        <span className="text-[7px] text-gray-300 font-bold mt-0.5 text-center leading-tight">Nivel<br/>{TIERS[gift.requiredTier].name.split(' ')[0]}</span>
                      </div>
                    )}
                    <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">{gift.emoji}</div>
                    <span className="text-yellow-400 text-xs font-bold">{gift.price}</span>
                    {comboState.id === gift.id && comboState.count > 0 && (
                      <motion.div 
                        initial={{ scale: 0.5, y: 10, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        key={comboState.count}
                        className="absolute -top-3 -right-2 bg-gradient-to-tr from-pink-500 to-purple-500 text-white font-black text-xs px-2 py-0.5 rounded-full border border-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.8)] z-20"
                      >
                        x{comboState.count}
                      </motion.div>
                    )}
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
