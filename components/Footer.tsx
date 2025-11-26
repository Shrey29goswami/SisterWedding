import React from 'react';
import { Heart, Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface FooterProps {
  togglePlay: () => void;
  isPlaying: boolean;
  toggleMute: () => void;
  isMuted: boolean;
  currentTrackIndex: number;
  totalTracks: number;
}

const Footer: React.FC<FooterProps> = ({ 
  togglePlay, 
  isPlaying, 
  toggleMute, 
  isMuted, 
  currentTrackIndex, 
  totalTracks 
}) => {
  return (
    <footer className="bg-primary text-cream py-12 mt-12 relative overflow-hidden">
      {/* Decorative background pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h3 className="font-serif text-2xl mb-4">Smriti & Rishi</h3>
            <p className="font-sans font-light text-sm opacity-90 max-w-xs mx-auto md:mx-0">
              We can't wait to share our special day with you. Your presence means the world to us.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
             {/* Music Controls */}
             <div className="bg-primary/50 backdrop-blur-sm border border-cream/20 rounded-full px-4 py-2 flex items-center gap-4">
                
                {/* Play/Pause */}
                <button 
                  onClick={togglePlay}
                  className="hover:text-white text-cream/80 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <div className="flex flex-col items-center w-24">
                  <span className="text-[10px] uppercase tracking-widest opacity-70">Background Music</span>
                  <span className="text-xs font-serif">Track {currentTrackIndex + 1} / {totalTracks}</span>
                </div>

                {/* Mute/Unmute */}
                <button 
                  onClick={toggleMute}
                  className="hover:text-white text-cream/80 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
             </div>
             
             <p className="text-xs opacity-50">Theme: Leaf Green, Reseda Green & Pastel</p>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-serif text-lg mb-2">Contact</h4>
            <div className="space-y-1">
              <p className="text-sm font-light opacity-90">Bride's Family: +91 9835366585</p>
              <p className="text-sm font-light opacity-90">Bride's Family: +91 8340254329</p>
            </div>
            <p className="text-xs mt-4 opacity-50">© 2025 The Wedding</p>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-cream/20 text-center flex items-center justify-center gap-2 text-sm opacity-70">
          <span>Made with</span>
          <Heart className="w-4 h-4 fill-current text-accent" />
          <span>for the happy couple</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;