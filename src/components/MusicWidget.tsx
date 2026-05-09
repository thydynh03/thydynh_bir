import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    title: 'HIEUTHUHAI - NGỦ MỘT MÌNH (CHILL)',
    artist: 'Lofi Edit',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    title: 'ĐEN - MANG TIỀN VỀ CHO MẸ',
    artist: 'Chill Remix',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    title: 'SƠN TÙNG MTP - LẠC TRÔI',
    artist: 'Tradition Lofi',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

export default function MusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log("Audio play blocked", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  return (
    <div className="border-4 border-black p-4 rounded-2xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 h-full relative overflow-hidden group">
      <audio 
        ref={audioRef}
        src={TRACKS[currentTrackIndex].url}
        loop
        muted={isMuted}
      />
      
      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-[#FF6B00] shrink-0 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrackIndex}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <Music size={24} className={isPlaying ? 'animate-bounce' : ''} />
          </motion.div>
        </AnimatePresence>
        {isPlaying && (
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-[#FF6B00]/20 pointer-events-none"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="overflow-hidden">
          <motion.h4 
            animate={isPlaying ? { x: [0, -100, 0] } : {}}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="font-black text-[11px] uppercase whitespace-nowrap"
          >
            {TRACKS[currentTrackIndex].title}
          </motion.h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex gap-1 h-2 items-end">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                animate={isPlaying ? { height: [4, 8, 4] } : { height: 4 }}
                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                className="w-1 bg-[#FF6B00] rounded-full"
              />
            ))}
          </span>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
            {isPlaying ? 'Quẩy bùng lổ' : 'Hết xí quách'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-0.5 mr-1">
          <button onClick={handlePrev} className="p-1 hover:text-[#FF6B00] transition-colors"><SkipBack size={14} /></button>
          <button onClick={handleNext} className="p-1 hover:text-[#FF6B00] transition-colors"><SkipForward size={14} /></button>
        </div>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-1 hover:text-[#FF6B00] transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-10 h-10 border-2 border-black rounded-full flex items-center justify-center transition-all ${
            isPlaying ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,255,0,1)]' : 'bg-white text-black hover:bg-[#FF6B00] hover:text-white'
          }`}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
        </button>
      </div>
    </div>
  );
}
