import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/8788854789?text=Hi%20I%20want%20decoration"
    target="_blank" rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.6, type: 'spring', stiffness: 220 }}
    whileHover={{ scale: 1.10 }}
    whileTap={{ scale: 0.93 }}
    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    aria-label="Chat on WhatsApp"
  >
    {/* Tooltip */}
    <span
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm px-4 py-2 rounded-full whitespace-nowrap font-body shadow-xl"
      style={{
        background: 'rgba(7,26,62,0.95)',
        border: '1px solid rgba(212,175,55,0.28)',
        color: '#f4d97a',
      }}
    >
      Chat with us
    </span>

    {/* Button */}
    <div className="relative">
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25" />
      <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/35"
        style={{ background: 'linear-gradient(135deg,#25d366,#128c7e)' }}
      >
        <MessageCircle size={26} fill="white" strokeWidth={0} color="white" />
      </div>
    </div>
  </motion.a>
);

export default WhatsAppButton;
