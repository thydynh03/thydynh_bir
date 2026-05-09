import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const HOURS = ['08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'];

const generateWeeks = () => {
  const weeks = [];
  const now = new Date(); // In production, this will be the user's current date
  const day = now.getDay();
  // Get Monday of current week
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));

  for (let i = 0; i < 4; i++) {
    const start = new Date(monday);
    start.setDate(monday.getDate() + (i * 7));
    const dayStr = start.getDate().toString().padStart(2, '0');
    const monthStr = (start.getMonth() + 1).toString().padStart(2, '0');
    weeks.push(`Tuần ${dayStr}/${monthStr}`);
  }
  return weeks;
};

const WEEKS = generateWeeks();

export default function HeatmapPicker() {
  const [votes, setVotes] = useState<Record<string, { count: number; loc: string }>>({});
  const [currentWeek, setCurrentWeek] = useState(0);
  const [activeTab, setActiveTab] = useState<'VinWonders' | 'Camping'>('VinWonders');

  const handleVote = (day: string, hour: string) => {
    const key = `${WEEKS[currentWeek]}-${day}-${hour}`;
    setVotes(prev => ({
      ...prev,
      [key]: {
        count: (prev[key]?.count || 0) + 1,
        loc: activeTab
      }
    }));
  };

  const nextWeek = () => setCurrentWeek(prev => (prev + 1) % WEEKS.length);
  const prevWeek = () => setCurrentWeek(prev => (prev - 1 + WEEKS.length) % WEEKS.length);

  return (
    <div className="border-4 border-black p-6 rounded-3xl bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h3 className="font-black text-xl uppercase tracking-tighter italic whitespace-nowrap flex items-center gap-2">
            <Clock className="text-[#FF6B00]" /> 🔥 HEATMAP PICK
          </h3>
          <div className="flex gap-2">
            {['VinWonders', 'Camping'].map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveTab(loc as any)}
                className={`text-[9px] font-black uppercase px-2 py-0.5 border-2 border-black rounded-full transition-all ${
                  activeTab === loc ? 'bg-black text-white' : 'bg-transparent text-black opacity-50 hover:opacity-100'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-100 border-2 border-black rounded-xl p-1 shrink-0">
          <button onClick={prevWeek} className="p-1 hover:bg-black hover:text-white rounded-lg transition-colors">
            <ChevronLeft size={16} />
          </button>
          <span className="font-black text-[10px] uppercase min-w-[60px] text-center">{WEEKS[currentWeek]}</span>
          <button onClick={nextWeek} className="p-1 hover:bg-black hover:text-white rounded-lg transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-1 flex-1 overflow-x-auto pb-2">
        <div className="flex flex-col gap-1 pt-6 pr-2">
          {HOURS.map(hour => (
            <div key={hour} className="h-8 flex items-center justify-end font-black text-[9px] uppercase text-gray-400">
              {hour}
            </div>
          ))}
        </div>

        {DAYS.map(day => (
          <div key={day} className="flex flex-col gap-1 min-w-[40px]">
            <div className="text-center font-black text-[10px] uppercase mb-1">
              {day}
            </div>
            {HOURS.map(hour => {
              const key = `${WEEKS[currentWeek]}-${day}-${hour}`;
              const vote = votes[key];
              const count = vote?.count || 0;
              const loc = vote?.loc;
              
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  whileTap={{ 
                    scale: 0.8, 
                    rotate: Math.random() * 10 - 5,
                  }}
                  onClick={() => handleVote(day, hour)}
                  animate={{ 
                    backgroundColor: count === 0 ? '#f9fafb' : (loc === 'VinWonders' ? '#FF6B00' : '#00FF00'),
                    opacity: count === 0 ? 1 : Math.min(0.4 + (count * 0.1), 1),
                  }}
                  className="h-8 border border-black/10 rounded shadow-sm cursor-pointer relative group flex items-center justify-center"
                >
                   <AnimatePresence>
                    {count > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[8px] font-black pointer-events-none"
                      >
                        {count}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[10px] font-bold italic text-gray-500 uppercase tracking-wider">
          * Ô càng đậm = Càng nhiều người rảnh
        </p>
        <div className="flex items-center gap-1 text-[9px] font-black uppercase text-[#FF6B00]">
          <Clock size={10} />
          <span>Theo giờ chi tiết</span>
        </div>
      </div>
    </div>
  );
}
