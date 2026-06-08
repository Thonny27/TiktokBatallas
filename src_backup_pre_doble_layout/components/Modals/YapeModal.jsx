import React from 'react';
import { X, Wallet, QrCode, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function YapeModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gray-900 w-full max-w-sm rounded-3xl border border-pink-500/30 p-6 flex flex-col items-center shadow-2xl relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-pink-500/20">
              <Wallet size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-black text-white mb-2 text-center">Recargar Monedas</h2>
            <p className="text-gray-400 text-center text-[11px] mb-4">Escanea el QR para yapear. Luego envía la captura para validar.</p>
            <div className="bg-white p-3 rounded-xl mb-4 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <QrCode size={100} className="text-black mb-1" />
              <span className="text-black font-bold text-sm">Yape</span>
            </div>
            <button className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] text-sm active:scale-[0.98]">
              <Send size={16} className="mr-2" /> Enviar captura
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
