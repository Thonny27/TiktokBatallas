import React from 'react';
import { ShieldAlert, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPanel({ onLogout }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 space-y-6 h-full overflow-y-auto pb-24 no-scrollbar"
    >
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center">
            <ShieldAlert className="mr-2 text-pink-500" /> Admin
          </h2>
          <p className="text-gray-400 text-sm mt-1">Conciliación de Yape</p>
        </div>
        <button onClick={onLogout} className="text-gray-500 hover:text-white text-sm font-bold bg-gray-800 px-3 py-1.5 rounded-lg transition-colors">Salir</button>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-4 flex justify-between border border-gray-700 shadow-lg">
        <div>
          <p className="text-gray-500 text-[10px] font-bold uppercase">Ingresos Fiat (S/)</p>
          <p className="text-green-400 font-black text-lg">S/ 4,250.00</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-[10px] font-bold uppercase">Monedas Emitidas</p>
          <p className="text-yellow-400 font-black text-lg">🪙 425,000</p>
        </div>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg">
        <h3 className="text-base font-bold text-white mb-4 flex items-center">
          <Clock className="mr-2 text-yellow-500" size={16} /> Pendientes de Recarga
        </h3>
        <div className="space-y-3">
          {/* Item de Recarga */}
          <div className="flex flex-col bg-gray-800 p-3 rounded-xl border border-gray-700 transition hover:border-gray-600">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-bold text-sm">juan.perez@gmail.com</p>
                <p className="text-gray-400 text-[10px]">Op: #99384729 • Yape S/ 50.00</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-bold text-sm">🪙 5,000</p>
                <p className="text-green-400 text-[10px]">+10% Cashback</p>
              </div>
            </div>
            <button className="w-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600 py-2 rounded-lg text-sm font-bold text-white shadow-lg active:scale-[0.98] transition-transform">
              Aprobar Recarga
            </button>
          </div>
          
          <div className="flex flex-col bg-gray-800 p-3 rounded-xl border border-gray-700 transition hover:border-gray-600">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-bold text-sm">maria.lopez@yahoo.com</p>
                <p className="text-gray-400 text-[10px]">Op: #99384812 • Yape S/ 20.00</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-bold text-sm">🪙 2,000</p>
              </div>
            </div>
            <button className="w-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600 py-2 rounded-lg text-sm font-bold text-white shadow-lg active:scale-[0.98] transition-transform">
              Aprobar Recarga
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
