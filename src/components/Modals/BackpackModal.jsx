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
                    <div key={index} className="bg-slate-800 rounded-2xl p-3 border border-slate-700 shadow-md flex flex-col items-center justify-between relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-md z-10">
                        x{powerup.amount}
                      </div>

                      <div className="text-4xl mb-2 drop-shadow-md z-10 mt-2">
                        {powerup.icon}
                      </div>
                      
                      <h3 className="text-white font-bold text-sm text-center z-10">{powerup.name}</h3>
                      
                      <button 
                        onClick={() => handleLaunchPowerup(powerup)}
                        className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded-xl transition-colors text-xs flex items-center justify-center z-10"
                      >
                        <Play size={12} className="mr-1 fill-current" />
                        Lanzar
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
