import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Users, DollarSign, MapPin, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface Member {
  id: string;
  name: string;
}

interface ThiDashboardProps {
  members: Member[];
  budget: number;
  targetBudget: number;
}

export default function ThiDashboard({ members, budget, targetBudget }: ThiDashboardProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Welcome Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-black text-white p-8 rounded-[2rem] border-4 border-black relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(255,107,0,1)]"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 text-[#00FF00]">
              <ShieldCheck size={20} />
              <span className="font-black uppercase tracking-widest text-xs">ADMIN ACCESS GRANTED</span>
            </div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-2">HELLO, BOSS THI!</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Tất cả mọi thứ đã sẵn sàng cho buổi quẩy của team.</p>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-20 rotate-12">
            <Users size={200} strokeWidth={4} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border-4 border-black p-8 rounded-[2rem] flex flex-col justify-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex items-center gap-4 mb-4">
            <Clock className="text-[#FF6B00]" size={32} />
            <div>
              <p className="font-black text-4xl italic tracking-tighter uppercase">{formatTime(time)}</p>
              <p className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">{formatDate(time)}</p>
            </div>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border-2 border-black">
            <motion.div 
              animate={{ x: [-100, 400] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-20 h-full bg-[#00FF00]"
            />
          </div>
        </motion.div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Members Status */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white border-4 border-black p-6 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,255,0,1)]"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-[#00FF00] rounded-2xl flex items-center justify-center border-4 border-black">
              <Users size={24} strokeWidth={3} />
            </div>
            <span className="font-black text-xs uppercase bg-black text-white px-3 py-1 rounded-full">Active</span>
          </div>
          <h3 className="text-gray-500 font-black uppercase text-xs tracking-widest mb-1">Thành viên</h3>
          <p className="text-4xl font-black italic tracking-tighter mb-4">{members.length} ĐỒNG BỌN</p>
          <div className="flex -space-x-3">
            {members.slice(0, 3).map((m, i) => (
              <div key={m.id} className="w-10 h-10 rounded-full border-4 border-black bg-gray-200 flex items-center justify-center font-black text-xs overflow-hidden">
                {m.name.charAt(0)}
              </div>
            ))}
            {members.length > 3 && (
              <div className="w-10 h-10 rounded-full border-4 border-black bg-black text-white flex items-center justify-center font-black text-xs">
                +{members.length - 3}
              </div>
            )}
          </div>
        </motion.div>

        {/* Budget Status */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white border-4 border-black p-6 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(255,107,0,1)]"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-[#FF6B00] rounded-2xl flex items-center justify-center border-4 border-black">
              <DollarSign size={24} strokeWidth={3} className="text-white" />
            </div>
            <span className="font-black text-xs uppercase bg-[#00FF00]/20 text-[#008000] px-3 py-1 rounded-full">{Math.round((budget/targetBudget)*100)}%</span>
          </div>
          <h3 className="text-gray-500 font-black uppercase text-xs tracking-widest mb-1">Ngân sách hiện tại</h3>
          <p className="text-3xl font-black italic tracking-tighter mb-2">{budget.toLocaleString()} VNĐ</p>
          <div className="w-full bg-gray-100 h-4 border-2 border-black rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((budget/targetBudget)*100, 100)}%` }}
              className="h-full bg-[#FF6B00]"
            />
          </div>
          <p className="mt-2 font-bold text-[10px] text-gray-400 uppercase">Mục tiêu: {targetBudget.toLocaleString()} VNĐ</p>
        </motion.div>

        {/* Location Status */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white border-4 border-black p-6 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border-4 border-black">
              <MapPin size={24} strokeWidth={3} className="text-white" />
            </div>
          </div>
          <h3 className="text-gray-500 font-black uppercase text-xs tracking-widest mb-1">Địa điểm Vote nhiều</h3>
          <p className="text-3xl font-black italic tracking-tighter mb-2">VINWONDERS</p>
          <div className="flex items-center gap-2 text-[#FF6B00] font-black text-xs uppercase">
            <Calendar size={14} />
            <span>Dự kiến: Thứ 7 tuần tới</span>
          </div>
        </motion.div>
      </div>

      {/* Activity Timeline / Task List */}
      <div className="bg-white border-8 border-black p-8 rounded-[3rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]">
        <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-8 flex items-center gap-4">
          <ArrowRight className="text-[#00FF00]" size={32} /> NHIỆM VỤ CỦA BOSS
        </h3>

        <div className="space-y-4">
          {[
            { task: 'Duyệt danh sách thành viên cuối cùng', status: 'Done', color: '#00FF00' },
            { task: 'Đặt vé VinWonders (Team 15 người)', status: 'Pending', color: '#FF6B00' },
            { task: 'Thông báo địa điểm tập trung cho anh em', status: 'In Progress', color: '#000000' },
            { task: 'Duyệt menu tiệc nướng buổi tối', status: 'Pending', color: '#FF6B00' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-gray-50 border-4 border-black rounded-2xl hover:translate-x-2 transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full border-2 border-black" style={{ backgroundColor: item.color }}></div>
                <span className="font-black uppercase tracking-tight">{item.task}</span>
              </div>
              <span className={`font-black text-[10px] uppercase border-2 border-black px-3 py-1 rounded-lg ${item.status === 'Done' ? 'bg-[#00FF00]' : 'bg-white'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
