import React from 'react';
import { X, Users, Shield, Flag, ChevronRight, Heart, Sprout, Swords, ShieldCheck, Flame, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Datos de Ligas
const LEAGUES = {
  aspirante: { name: 'Aspirante', icon: <Sprout size={32} className="text-green-500 drop-shadow-md" />, bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  guerrera: { name: 'Guerrera', icon: <Swords size={32} className="text-slate-500 drop-shadow-md" />, bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-300' },
  elite: { name: 'Élite', icon: <ShieldCheck size={32} className="text-yellow-500 drop-shadow-md" />, bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-300' },
  legendaria: { name: 'Legendaria', icon: <Flame size={32} className="text-orange-500 drop-shadow-md" />, bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300' },
  suprema: { name: 'Suprema', icon: <Crown size={32} className="text-purple-500 drop-shadow-md" />, bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300' },
};

export default function HostProfileModal({ isOpen, onClose, host }) {
  if (!host) return null;

  // Mock de datos si no vienen todos en el objeto 'host'
  const profile = {
    name: host.name || 'Anfitrión_Pro',
    handle: host.handle || '@anfitrion_oficial',
    avatar: host.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${host.name || 'Host'}`,
    followers: host.followers || '12.5K',
    following: host.following || '360',
    league: host.league || 'elite',
    leagueLevel: host.leagueLevel || 3, // Del 5 al 1
    mvpLevel: host.mvpLevel || 25,
    communitySize: host.communitySize || 144,
  };

  const leagueData = LEAGUES[profile.league] || LEAGUES.elite;

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
            className="w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] relative z-10 flex flex-col overflow-hidden"
          >
            {/* Grabber handle (la rayita arriba) */}
            <div className="w-full flex justify-center py-3">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            <div className="px-6 pb-6 pt-2">
              {/* HEADER: Foto, Nombres, Bandera */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  {/* Foto con borde */}
                  <div className="w-16 h-16 rounded-full border-2 border-gray-200 overflow-hidden shadow-sm shrink-0">
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover bg-gray-100" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      {profile.name}
                      <span className="ml-2 text-sm">🌸🐰</span>
                    </h2>
                    <p className="text-gray-500 text-sm">{profile.handle}</p>
                  </div>
                </div>
                {/* Botón de reporte/flag */}
                <button className="text-gray-400 hover:text-gray-600 p-2 bg-gray-50 rounded-full border border-gray-100 transition-colors">
                  <Flag size={18} />
                </button>
              </div>

              {/* SEGUIDORES Y DESCRIPCIÓN */}
              <div className="mb-4">
                <p className="text-gray-900 font-bold text-sm">
                  {profile.followers} <span className="font-normal text-gray-600">seguidores</span> · {profile.following} <span className="font-normal text-gray-600">siguiendo</span>
                </p>
                <p className="text-gray-500 text-xs mt-1">Batalla Oficial TIKTOK - En Vivo</p>
              </div>

              {/* TARJETAS DE MÉTRICAS (Grid) */}
              <div className="grid grid-cols-2 gap-4 mt-8 mb-4">
                {/* 1. Liga */}
                <div className={`relative flex flex-col items-center justify-center pt-6 pb-2 rounded-xl border ${leagueData.bg} ${leagueData.border}`}>
                  {/* Ícono sobresaliendo en forma de diamante */}
                  <div className={`absolute -top-6 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border ${leagueData.border} rotate-45`}>
                    <div className="-rotate-45 scale-110 drop-shadow-sm">{leagueData.icon}</div>
                  </div>
                  <span className={`text-sm font-black ${leagueData.text} mt-1`}>{leagueData.name} {profile.leagueLevel}</span>
                  <div className="flex items-center text-[10px] text-gray-500 mt-1 font-bold">
                    📊 Núm. 99+
                  </div>
                </div>

                {/* 3. Nivel MVP */}
                <div className="relative flex flex-col items-center justify-center pt-6 pb-2 rounded-xl border bg-purple-50 border-purple-200">
                  {/* Ícono MVP sobresaliendo sin fondo (Emoji 3D) */}
                  <div className="absolute -top-7 w-14 h-14 flex items-center justify-center drop-shadow-lg transition-transform hover:scale-110 cursor-pointer">
                    <span className="text-5xl">💎</span>
                  </div>
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-0.5 mt-1">Nivel MVP</span>
                  <span className="text-sm font-black text-purple-700 leading-tight">Niv. {profile.mvpLevel}</span>
                </div>
              </div>

              {/* GALERÍA DE REGALOS */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-100 mb-6 cursor-pointer hover:bg-blue-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-600 rounded-lg shrink-0">
                    <Shield size={18} />
                  </div>
                  <div>
                    <p className="text-blue-900 font-bold text-sm leading-tight">
                      Galería de Regalos de {leagueData.name} {profile.leagueLevel}
                    </p>
                    <p className="text-blue-600 font-bold text-xs">5<span className="text-blue-400 font-normal">/19</span></p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🚀</span>
                  <span className="text-lg">💖</span>
                  <ChevronRight size={20} className="text-blue-400" />
                </div>
              </div>

              {/* BOTÓN DE ACCIÓN: SEGUIR */}
              <button className="w-full bg-[#ff2b55] hover:bg-[#e0264a] text-white font-bold py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 text-lg">
                + Seguir
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
