import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const locations = [
  {
    id: 'vin',
    name: 'VinWonders Nam Hội An',
    type: 'VUI CHƠI',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
    description: 'Quẩy banh nóc với các trò chơi cảm giác mạnh và công viên nước cực cháy!'
  },
  {
    id: 'hoabac',
    name: 'Hòa Bắc Camping',
    type: 'CHILLING',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800',
    description: 'Nướng BBQ bên suối, ngắm mây và tâm sự mỏng sau chuỗi ngày đồ án vật vã.'
  }
];

export default function LocationShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {locations.map((loc, idx) => (
        <motion.div 
          key={loc.id}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            "group relative overflow-hidden border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col",
            idx === 0 ? "bg-[#00FF00]" : "bg-white"
          )}
        >
          <span className={cn(
            "text-[10px] font-black uppercase mb-1 tracking-widest",
            idx === 0 ? "text-black" : "text-[#FF6B00]"
          )}>
            Main Spot #{idx + 1}
          </span>
          <h3 className="text-2xl font-black mb-2 uppercase italic tracking-tighter">{loc.name}</h3>
          
          <div className="flex-1 min-h-[140px] bg-black/10 rounded-2xl border-4 border-black mb-4 relative overflow-hidden">
            <img 
              src={loc.image} 
              alt={loc.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          
          <p className="font-bold text-sm leading-tight text-gray-900">{loc.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
