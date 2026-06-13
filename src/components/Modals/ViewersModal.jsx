import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ShieldCheck } from 'lucide-react';
import { TIERS } from '../../utils/tiers';

const getTierForIndex = (i) => {
  if (i === 0) return TIERS[8];
  if (i < 3) return TIERS[6 + Math.floor(Math.random() * 2)];
  if (i < 10) return TIERS[3 + Math.floor(Math.random() * 3)];
  return TIERS[Math.floor(Math.random() * 3)];
};

const MOCK_VIEWERS = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Espectador_${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Viewer${i + 1}&style=circle`,
  tier: getTierForIndex(i),
  isVip: Math.random() > 0.8,
  role: i === 0 ? 'top_fan' : i < 3 ? 'moderator' : 'viewer',
}));

export default function ViewersModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end pointer-events-auto">
          {/* Fondo oscuro para cerrar al hacer clic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full h-[60%] bg-[#1a1a2e] rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] relative z-10 flex flex-col overflow-hidden border-t border-white/10"
          >
            {/* Grabber handle */}
            <div className="w-full flex justify-center py-3 shrink-0">
              <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="px-6 pb-4 pt-2 shrink-0">
              <h2 className="text-lg font-bold text-white">Espectadores</h2>
              <p className="text-gray-400 text-xs">20 personas viendo ahora</p>
            </div>

            {/* Lista de Espectadores */}
            <div className="flex-1 overflow-y-auto px-4 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {MOCK_VIEWERS.map((viewer, index) => (
                <div key={viewer.id} className="flex items-center justify-between py-2 mb-1 hover:bg-white/5 px-2 rounded-xl transition-colors cursor-pointer">
                  
                  <div className="flex items-center space-x-3">
                    {/* Número/Ranking */}
                    <span className={`w-5 text-center font-bold text-xs ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-orange-400' : 'text-gray-500'}`}>
                      {index + 1}
                    </span>

                    {/* Avatar */}
                    <div className="relative">
                      <div className={`rounded-full p-[2px] bg-gradient-to-tr ${viewer.tier.colors}`}>
                        <img src={viewer.avatar} alt="viewer" className="w-10 h-10 rounded-full bg-[#1a1a2e] border-2 border-[#1a1a2e]" />
                      </div>
                      {viewer.role === 'top_fan' && (
                        <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-0.5 border-2 border-[#1a1a2e]">
                          <Crown size={10} className="text-white" />
                        </div>
                      )}
                      {viewer.role === 'moderator' && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5 border-2 border-[#1a1a2e]">
                          <ShieldCheck size={10} className="text-white" />
                        </div>
                      )}
                    </div>

                    {/* Nombre y Badge de Artefacto */}
                    <div className="flex flex-col">
                      <span className={`font-bold text-sm ${viewer.isVip ? 'text-purple-400' : 'text-gray-200'}`}>
                        {viewer.name}
                      </span>
                      <div className="flex items-center space-x-1 mt-0.5">
                        <span className={`bg-gradient-to-r ${viewer.tier.colors} text-white text-[9px] px-2 py-[2px] rounded-full font-bold shadow-sm flex items-center space-x-1`}>
                          <span className="drop-shadow-md">{viewer.tier.icon}</span>
                          <span>{viewer.tier.name}</span>
                        </span>
                        {viewer.isVip && (
                          <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] px-1.5 py-0.5 rounded font-bold">
                            MVP
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
