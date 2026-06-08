import React from 'react';
import { Star, Flame, ShieldAlert, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoleSelector({ onSelectRole }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-black min-h-[100dvh] flex items-center justify-center font-sans relative overflow-hidden">
      {/* Fondo Inmersivo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-[pulse_4s_ease-in-out_infinite] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8)_80%)] pointer-events-none"></div>
      
      <div className="w-full max-w-md h-full md:h-[850px] relative z-10 flex flex-col items-center justify-center p-6 bg-transparent md:border md:border-gray-800 md:rounded-3xl shadow-2xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10 mt-[-40px]"
        >
          <div className="flex items-center space-x-2 mb-3 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]"></div>
            <span className="text-red-500 font-black tracking-widest text-[10px] uppercase">Piloto en Vivo</span>
          </div>
          
          <h1 className="text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] mb-1">
            TEGANO
          </h1>
          
          <div className="mt-4 px-5 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-lg">
            <p className="text-gray-300 text-sm font-medium tracking-wide">
              Batallas Reales. <span className="text-pink-500 font-bold drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">Defiende a tu Anfitrión.</span>
            </p>
          </div>
        </motion.div>

        {/* Tarjetas / Auth */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center mt-8"
        >
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] text-center mb-6">Accede a la Arena</p>
          
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectRole('mvp')} // Mock for now: auto-login as MVP
            className="group relative w-full md:w-3/4 flex items-center justify-center space-x-3 p-4 bg-white rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            <span className="text-black font-black text-lg">Continuar con Google</span>
          </motion.button>
          
          <p className="text-gray-500 text-xs mt-4 text-center px-8">
            Al continuar, aceptas que TEGANO maneje tu billetera de monedas virtuales.
          </p>

          {/* Opciones ocultas para pruebas locales (Mock Roles) */}
          <div className="mt-12 w-full flex justify-center space-x-6 border-t border-gray-800 pt-6">
             <button onClick={() => onSelectRole('host')} className="text-gray-600 text-xs hover:text-cyan-400 transition-colors font-bold flex flex-col items-center">
               <Flame size={16} className="mb-1" /> Test: Host
             </button>
             <button onClick={() => onSelectRole('admin')} className="text-gray-600 text-xs hover:text-purple-400 transition-colors font-bold flex flex-col items-center">
               <ShieldAlert size={16} className="mb-1" /> Test: Admin
             </button>
          </div>
        </motion.div>
        
        <div className="absolute bottom-6 text-center w-full px-12">
          <p className="text-gray-600 text-[9px] font-bold uppercase tracking-wider">
            Acceso Exclusivo • Piloto V1.0
          </p>
        </div>
      </div>
    </div>
  );
}
