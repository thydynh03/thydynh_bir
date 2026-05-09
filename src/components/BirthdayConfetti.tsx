import { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

const WISHES = [
  "Chúc Thi sinh nhật bùng nổ, đồ án điểm A+! 🚀",
  "Tuổi mới rạng rỡ, code không bug, tình duyên phơi phới! 💖",
  "Chúc mừng sinh nhật Nguyễn Đình Thi - Master of FPT! 🎓",
  "Mừng sinh nhật Thi, quẩy hết mình sau kỳ đồ án vật vã! 🔥",
  "Chúc Thi mãi chất, mãi cháy, mãi là linh hồn của nhóm! 🎸"
];

export default function BirthdayConfetti() {
  const [showWish, setShowWish] = useState(false);
  const [currentWish, setCurrentWish] = useState("");

  const fire = () => {
    setCurrentWish(WISHES[Math.floor(Math.random() * WISHES.length)]);
    setShowWish(true);
    setTimeout(() => setShowWish(false), 3000);

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 100,
      colors: ['#FF6B00', '#FFD700', '#FFA500', '#FFFFFF'] // Orange and Gold
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <div className="flex flex-col items-center relative">
      <AnimatePresence>
        {showWish && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: -100, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-50 bg-white border-4 border-black p-4 rounded-2xl shadow-[8px_8px_0px_0px_#FF6B00] min-w-[250px] text-center"
          >
            <p className="font-black text-[#FF6B00] uppercase italic tracking-tight">{currentWish}</p>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b-4 border-r-4 border-black rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileTap={{ scale: 0.9, rotate: 2 }}
        onClick={fire}
        className="group relative px-6 py-4 bg-yellow-400 border-4 border-black rounded-2xl font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FF6B00] hover:text-white transition-all overflow-hidden"
      >
        <span className="relative z-10 uppercase tracking-tighter italic">CHÚC MỪNG SINH NHẬT THI! 🎉</span>
        <motion.div 
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-white/30 skew-x-12"
        />
      </motion.button>
      <p className="mt-2 font-bold text-sm text-gray-500 italic">Click để bắn pháo hoa nè! 🎇</p>
    </div>
  );
}
