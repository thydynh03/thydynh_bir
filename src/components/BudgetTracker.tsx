import { useState } from 'react';
import { motion } from 'motion/react';
import { PlusCircle } from 'lucide-react';

export default function BudgetTracker() {
  const [currentBudget, setCurrentBudget] = useState(1700000);
  const target = 5000000;
  const percentage = Math.min((currentBudget / target) * 100, 100);

  const [contribution, setContribution] = useState('');

  const handleAdd = () => {
    const val = parseInt(contribution);
    if (!isNaN(val) && val > 0) {
      setCurrentBudget(prev => prev + val);
      setContribution('');
    }
  };

  return (
    <div className="border-4 border-black p-6 rounded-3xl bg-white shadow-[8px_8px_0px_0px_rgba(255,107,0,1)] flex flex-col h-full">
      <h3 className="font-black text-xl mb-4 uppercase italic flex items-center gap-2">
        💸 QUỸ ĂN CHƠI
      </h3>
      
      <div className="relative w-full bg-gray-100 rounded-full h-10 border-4 border-black overflow-hidden mb-6 shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="bg-[#FF6B00] h-full flex items-center justify-end pr-4 text-white font-black text-xs sm:text-base border-r-4 border-black"
        >
          {currentBudget.toLocaleString()} VNĐ
        </motion.div>
      </div>

      <div className="flex-1">
        <div className="bg-black/5 p-4 rounded-2xl border-2 border-black border-dashed mb-4">
          <p className="font-bold text-[10px] uppercase text-gray-500 mb-2 whitespace-nowrap">Góp thêm lúa nè anh em</p>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              placeholder="50.000"
              className="flex-1 min-w-0 bg-white border-2 border-black rounded-lg px-2 py-2 font-bold text-sm focus:outline-none"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              className="bg-[#00FF00] border-2 border-black p-2 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all flex-shrink-0"
            >
              <PlusCircle size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <p className="font-bold text-[13px] leading-tight text-gray-700">
          {currentBudget >= target ? (
            <span className="text-[#00CC00] uppercase font-black tracking-tighter">Đã đủ quẩy rồi anh em ơi! 🎉</span>
          ) : (
            <>
              Anh em mình góp thêm <span className="text-[#FF6B00]">{(target - currentBudget).toLocaleString()}</span> nữa là đủ quẩy! 🍻
            </>
          )}
        </p>
      </div>
    </div>
  );
}
