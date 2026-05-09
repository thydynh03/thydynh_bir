/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from './components/Hero';
import LocationShowcase from './components/LocationShowcase';
import HeatmapPicker from './components/HeatmapPicker';
import AddYourVibe from './components/AddYourVibe';
import BudgetTracker from './components/BudgetTracker';
import MusicWidget from './components/MusicWidget';
import BirthdayConfetti from './components/BirthdayConfetti';
import ThiDashboard from './components/ThiDashboard';
import { Send, User, ChevronRight, Users, Plus, Trash2, LayoutDashboard, Home } from 'lucide-react';

interface Member {
  id: string;
  name: string;
}

export default function App() {
  const [userName, setUserName] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'dashboard'>('home');
  const [tempName, setTempName] = useState('');
  const [budget, setBudget] = useState(1700000);
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Thi (Boss)' },
    { id: '2', name: 'Hoàng Anh' },
    { id: '3', name: 'Khôi' }
  ]);
  const [newMemberName, setNewMemberName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setUserName(tempName);
      setIsLogged(true);
    }
  };

  const addMember = () => {
    if (newMemberName.trim()) {
      setMembers([...members, { id: Date.now().toString(), name: newMemberName.trim() }]);
      setNewMemberName('');
    }
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans text-[#1a1a1a] selection:bg-[#FF6B00] selection:text-white pb-20 p-6 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isLogged ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-[#FF6B00] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white border-8 border-black p-10 rounded-[3rem] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-w-md w-full"
            >
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-white text-5xl font-black italic">
                  F
                </div>
              </div>
              <h1 className="text-4xl font-black italic uppercase text-center mb-2 tracking-tighter">WHAT'S YOUR NAME?</h1>
              <p className="text-center font-bold text-gray-400 mb-8 uppercase tracking-widest text-[10px]">Nhập tên để quẩy cùng đồng bọn nè!</p>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                  <input 
                    autoFocus
                    type="text" 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Tên của bạn..."
                    className="w-full bg-gray-100 border-4 border-black rounded-2xl py-4 pl-14 pr-6 font-black text-xl focus:outline-none focus:ring-4 ring-[#00FF00]/30"
                  />
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-black text-white py-5 rounded-2xl font-black text-2xl border-4 border-transparent hover:border-[#00FF00] transition-colors flex items-center justify-center gap-3 group"
                >
                  VÀO PARTYYY <ChevronRight className="group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            {/* Header Bar */}
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF6B00] rounded-xl flex items-center justify-center font-black text-white text-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">F</div>
                <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
                  FPT CHILLING <span className="text-[#FF6B00]">.EXE</span>
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 p-1 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <button 
                    onClick={() => setActiveView('home')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      activeView === 'home' ? 'bg-black text-white' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Home size={18} strokeWidth={3} />
                    <span className="font-black text-xs uppercase tracking-tighter italic">PARTY</span>
                  </button>

                  <button 
                    onClick={() => setActiveView('dashboard')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      activeView === 'dashboard' ? 'bg-[#FF6B00] text-white' : 'hover:bg-gray-200'
                    }`}
                  >
                    <LayoutDashboard size={18} strokeWidth={3} />
                    <span className="font-black text-xs uppercase tracking-tighter italic">DASHBOARD</span>
                  </button>
                </div>

                <div className="hidden md:flex items-center gap-3 bg-white border-4 border-black px-6 py-3 rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                   <div className="w-8 h-8 bg-[#00FF00] rounded-full border-2 border-black flex items-center justify-center">
                      <User size={16} />
                   </div>
                   <span className="font-black uppercase tracking-tighter italic">Hi, {userName}!</span>
                </div>
                <div className="flex items-center gap-4 bg-white border-4 border-black px-6 py-3 rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  <span className="font-black text-sm uppercase tracking-[0.2em] text-[#FF6B00] italic">Project End Celebration</span>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                {activeView === 'home' ? (
                  <motion.div 
                    key="home-grid"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto"
                  >
                    <div className="lg:col-span-8 lg:row-span-2">
                      <Hero />
                    </div>
                    <div className="lg:col-span-4 lg:row-span-3">
                      <div className="h-full border-4 border-black p-6 rounded-3xl bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="text-[#FF6B00]" size={24} />
                          <h3 className="font-black text-2xl uppercase tracking-tighter italic">TEAM MEMBERS</h3>
                        </div>
                        
                        <div className="flex gap-2 mb-6">
                          <input 
                            type="text" 
                            value={newMemberName}
                            onChange={(e) => setNewMemberName(e.target.value)}
                            placeholder="Thêm thành viên..."
                            className="flex-1 px-3 py-2 bg-gray-50 border-2 border-black rounded-lg font-bold text-sm"
                            onKeyDown={(e) => e.key === 'Enter' && addMember()}
                          />
                          <button 
                            onClick={addMember}
                            className="p-2 bg-black text-white border-2 border-black rounded-lg hover:bg-[#00FF00] hover:text-black transition-colors"
                          >
                            <Plus size={20} strokeWidth={3} />
                          </button>
                        </div>

                        <div className="flex-1 space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                          <AnimatePresence initial={false}>
                            {members.map((member) => (
                              <motion.div 
                                key={member.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 20, opacity: 0 }}
                                className="group flex items-center justify-between p-3 bg-gray-50 border-2 border-black rounded-xl hover:bg-[#FFF0E0] transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-xs">
                                    {member.name.charAt(0).toUpperCase()}
                                  </div>
                                  <span className="font-black uppercase tracking-tight text-sm">{member.name}</span>
                                </div>
                                <button 
                                  onClick={() => removeMember(member.id)}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t-2 border-black border-dashed text-center">
                          <p className="font-black text-sm uppercase tracking-widest text-[#FF6B00]">Total: {members.length} Squad Members</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-8 lg:row-span-2">
                      <HeatmapPicker />
                    </div>
                    <div className="lg:col-span-4 lg:row-span-1">
                      <LocationShowcase />
                    </div>
                    <div className="lg:col-span-4 lg:row-span-1">
                       <BudgetTracker currentBudget={budget} onAdd={(amt) => setBudget(prev => prev + amt)} />
                    </div>
                    <div className="lg:col-span-4 lg:row-span-1">
                      <MusicWidget />
                    </div>
                    <div className="lg:col-span-4 lg:row-span-1">
                      <AddYourVibe />
                    </div>
                    <div className="lg:col-span-8 lg:row-span-1 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/5 border-4 border-black border-dashed rounded-3xl p-8 mt-4">
                       <div className="flex-1">
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Ready to party?</h3>
                          <p className="font-bold text-gray-600">Đừng để Thi phải đợi, chốt kèo lịch phát một nào anh em ơi!</p>
                       </div>
                       <div className="flex flex-col items-center gap-4">
                         <BirthdayConfetti />
                         <motion.button 
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl font-black text-xl border-4 border-[#00FF00] shadow-[8px_8px_0px_0px_rgba(0,255,0,0.5)] hover:shadow-none transition-all"
                        >
                          <Send size={24} /> GỬI LỜI MỜI .EXE
                        </motion.button>
                       </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thi-dashboard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ThiDashboard 
                      members={members} 
                      budget={budget} 
                      targetBudget={5000000} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto mt-20 border-t-8 border-black pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-black group">
              <div className="text-left">
                <p className="font-black text-2xl italic tracking-tighter uppercase">FPT UNIVERSITY <span className="text-[#FF6B00]">BATCH 17</span></p>
                <p className="font-bold text-gray-500 uppercase tracking-widest text-xs mt-1">© 2026 Crafted with GenZ Vibe</p>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-black rounded-lg border-2 border-white"></div>
                <div className="w-12 h-12 bg-[#FF6B00] rounded-lg border-2 border-black"></div>
                <div className="w-12 h-12 bg-[#00FF00] rounded-lg border-2 border-black"></div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
