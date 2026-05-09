import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

const TRACKS = [
  {
    title: 'Genz Vibe Lofi',
    artist: 'Chill Squad',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  }
];

export default function MusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="border-4 border-black p-4 rounded-2xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 h-full relative overflow-hidden">
      <audio 
        ref={audioRef}
        src={TRACKS[0].url}
        loop
        muted={isMuted}
      />
      
      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-[#FF6B00] shrink-0 relative overflow-hidden">
        {isPlaying && (
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-[#FF6B00]/20"
          />
        )}
        <Music size={24} className={isPlaying ? 'animate-bounce' : ''} />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-black text-sm uppercase truncate">{TRACKS[0].title}</h4>
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
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            {isPlaying ? 'Now Playing' : 'Paused'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-1 hover:text-[#FF6B00] transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-10 h-10 border-2 border-black rounded-full flex items-center justify-center transition-all ${
            isPlaying ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FF6B00] hover:text-white'
          }`}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
        </button>
      </div>
    </div>
  );
}
