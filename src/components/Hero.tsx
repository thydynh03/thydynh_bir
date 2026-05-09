import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden p-8 bg-[#FF6B00] border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-4 min-h-[340px]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative z-10"
      >
        <p className="text-white/80 font-black uppercase tracking-[0.3em] mb-2 text-sm">Mission Accomplished</p>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] uppercase italic mb-8">
          Ăn mừng đồ án <br /> 
          <span className="bg-black text-[#00FF00] px-3 py-1 inline-block mt-2">Quẩy sinh nhật Thi</span>
        </h1>
        
        <div className="flex flex-wrap gap-6 items-center">
          <motion.button 
            whileHover={{ y: 4, shadow: 'none' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-black text-white border-4 border-black font-black text-xl rounded-2xl shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] cursor-pointer uppercase tracking-tighter italic transition-all"
          >
            LÊN KÈO NGAY!
          </motion.button>
          
          <div className="flex -space-x-3 items-center">
            {['T', 'A', 'K'].map((initial, i) => (
              <div 
                key={i} 
                className={`w-12 h-12 rounded-full border-4 border-black flex items-center justify-center font-black text-xl shadow-md ${
                  i === 0 ? 'bg-white' : i === 1 ? 'bg-[#00FF00]' : 'bg-[#FFD700]'
                }`}
              >
                {initial}
              </div>
            ))}
            <div className="px-4 text-white font-black text-lg">+12 members</div>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative Elements */}
      <div className="absolute -right-10 -bottom-10 opacity-10 text-[200px] font-black italic select-none text-white leading-none">
        FPT
      </div>
      <div className="absolute top-4 right-8 bg-white border-4 border-black p-4 rounded-2xl rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <p className="font-black text-center text-xl">🎂 <br/> HBD THI</p>
      </div>
    </section>
  );
}
