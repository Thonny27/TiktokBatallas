import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Backpack, Zap, Play } from 'lucide-react';

export default function BackpackModal({ isOpen, onClose, inventoryPowerups, setInventoryPowerups, setActivePowerups }) {
  
  const handleLaunchPowerup = (powerup) => {
    // 1. Reducir cantidad del inventario
    setInventoryPowerups(prev => {
      const existing = prev.find(p => p.type === powerup.type && p.hostId === powerup.hostId);
      if (existing.amount > 1) {
        return prev.map(p => p === existing ? { ...p, amount: p.amount - 1 } : p);
      }
      return prev.filter(p => p !== existing);
    });

    // 2. Añadir a activos (con 20s de expiración)
    const newActivePowerup = {
      id: Date.now(),
      ...powerup,
      expiresAt: Date.now() + 20000, // 20 segundos
    };
    setActivePowerups(prev => [...prev, newActivePowerup]);

    onClose();
  };

  const hasItems = inventoryPowerups && inventoryPowerups.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end pointer-events-auto">
          {/* Fondo oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Contenedor Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] relative z-10 flex flex-col max-h-[80vh] overflow-hidden border-t border-slate-700"
          >
            {/* Grabber */}
            <div className="w-full flex justify-center py-3 bg-slate-900">
              <div className="w-12 h-1.5 bg-slate-600 rounded-full"></div>
            </div>

            <div className="px-6 pb-6 pt-2 overflow-y-auto overflow-x-hidden no-scrollbar">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight flex items-center">
                    <Backpack className="text-blue-500 mr-2" size={24} />
                    Mochila de Poderes
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">Lanza tus poderes en la batalla actual.</p>
                </div>
              </div>

              {!hasItems ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                  <Backpack size={48} className="mb-4 opacity-20" />
                  <p className="text-center font-medium">Tu mochila está vacía.</p>
                  <p className="text-xs text-center mt-2">Completa misiones para ganar poderes.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {inventoryPowerups.map((powerup, index) => (
                    <div key={index} className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-4 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)] flex flex-col items-center justify-between relative overflow-hidden group">
                      {/* Glow radial de fondo */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-80"></div>
                      
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-lg z-10 border border-white/20">
                        x{powerup.amount}
                      </div>

                      <div className="text-5xl mb-3 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] z-10 mt-3 transform group-hover:scale-110 transition-transform">
                        {powerup.icon}
                      </div>
                      
                      <h3 className="text-indigo-100 font-black text-sm text-center z-10 uppercase tracking-wide">{powerup.name}</h3>
                      
                      <button 
                        onClick={() => handleLaunchPowerup(powerup)}
                        className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-2 rounded-xl transition-all shadow-lg active:scale-95 text-xs flex items-center justify-center z-10 uppercase tracking-wider border border-white/10"
                      >
                        <Zap size={14} className="mr-1.5 text-yellow-300" fill="currentColor" />
                        Usar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
