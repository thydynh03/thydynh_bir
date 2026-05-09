import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X } from 'lucide-react';
import { StickyNote } from '../types.ts';

const COLORS = ['#FFD54F', '#4FC3F7', '#81C784', '#FF8A65', '#BA68C8'];

export default function AddYourVibe() {
  const [notes, setNotes] = useState<StickyNote[]>([
    { id: '1', text: 'Mì Quảng Bà Mua sau khi đi Vin!', color: '#FFD700', rotation: -2 },
  ]);
  const [inputText, setInputText] = useState('');

  const addNote = () => {
    if (!inputText.trim()) return;
    const newNote: StickyNote = {
      id: Date.now().toString(),
      text: inputText,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 8 - 4
    };
    setNotes([newNote, ...notes]);
    setInputText('');
  };

  const removeNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="border-4 border-black p-6 rounded-3xl bg-[#FFD700] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative h-full flex flex-col">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/20 border-2 border-black rounded shadow-sm"></div>
      
      <h3 className="font-black text-2xl mb-1 uppercase tracking-tighter italic">ADD YOUR VIBE</h3>
      <p className="text-xs mb-4 font-black uppercase tracking-widest text-black/60">Muốn đi đâu khác? Ghi vào đây!</p>
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập địa điểm mới..."
          className="flex-1 bg-white/50 border-2 border-black p-2 rounded-lg font-bold text-sm focus:outline-none focus:bg-white transition-colors"
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
        />
        <button 
          onClick={addNote}
          className="bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black transition-colors border-2 border-black"
        >
          <Plus size={20} strokeWidth={4} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-3">
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: note.rotation }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative p-3 min-h-[60px] flex items-center justify-center text-center font-bold border-2 border-black rounded-lg bg-white/40 shadow-sm"
              >
                <button 
                  onClick={() => removeNote(note.id)}
                  className="absolute top-1 right-1 text-black/40 hover:text-red-500"
                >
                  <X size={14} strokeWidth={4} />
                </button>
                <p className="text-xs font-black uppercase tracking-tight">{note.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
