import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Music } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import RSVP from './pages/RSVP';
import Gallery from './pages/Gallery';
import Wishes from './pages/Wishes';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// NOTE: We are using remote URLs for the preview so the error "no supported sources" disappears.
// TODO: When you have your actual MP3 files, uncomment the local paths and remove the remote URLs.
const PLAYLIST = [
  // Local files (Uncomment these when you have added files to public/assets/music/)
  // '/assets/music/track-1.mp3',
  // '/assets/music/track-2.mp3',
  // '/assets/music/track-3.mp3',

  // Remote placeholders for testing (Replace these!)
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
];

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Ref to track if we should auto-resume after track change or autoplay
  const shouldPlayRef = useRef(false);

  useEffect(() => {
    // Initialize Audio Object
    const audio = new Audio();
    audioRef.current = audio;
    
    // Default settings
    audio.src = PLAYLIST[0];
    audio.loop = false;
    
    // Check local storage for mute preference
    const savedMute = localStorage.getItem('music_muted');
    if (savedMute === 'false') {
      setIsMuted(false);
      audio.muted = false;
    } else {
      setIsMuted(true);
      audio.muted = true;
    }

    // --- Event Listeners to Sync State ---
    const updatePlayState = () => {
        const playing = !audio.paused;
        setIsPlaying(playing);
        // If playing, we definitely intend to be playing
        if (playing) shouldPlayRef.current = true;
    };

    const handleEnded = () => {
      // Move to next track
      setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
    };

    const handleError = (e: Event) => {
      console.warn("Audio playback error/Missing file:", audio.error);
      setIsPlaying(false);
      shouldPlayRef.current = false;
    };

    audio.addEventListener('play', updatePlayState);
    audio.addEventListener('pause', updatePlayState);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // --- Autoplay Logic ---
    const attemptAutoplay = async () => {
        try {
            // We intend to play
            shouldPlayRef.current = true; 
            // Only try if source is valid
            if (audio.networkState !== 3) { 
                await audio.play();
            }
        } catch (error) {
            console.log("Autoplay blocked, showing toast");
            shouldPlayRef.current = false; 
            setShowToast(true);
        }
    };
    attemptAutoplay();

    // --- User Interaction Listener ---
    const handleInteraction = () => {
        setShowToast(false);
        
        if (!audioRef.current) return;

        // Handle Unmute if not explicitly muted by user
        const explicitMute = localStorage.getItem('music_muted') === 'true';
        if (!explicitMute && audioRef.current.muted) {
            audioRef.current.muted = false;
            setIsMuted(false);
        }

        // If currently paused but we showed the toast (meaning we wanted to play), try playing now
        if (audioRef.current.paused && showToast && audioRef.current.networkState !== 3) {
             shouldPlayRef.current = true;
             audioRef.current.play().catch(e => console.warn("Interaction play failed", e));
        }
    };

    ['click', 'touchstart', 'scroll', 'keydown'].forEach(event => 
      document.addEventListener(event, handleInteraction, { once: true, passive: true })
    );

    return () => {
      audio.pause();
      audio.removeEventListener('play', updatePlayState);
      audio.removeEventListener('pause', updatePlayState);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, []);

  // --- Track Change Effect ---
  useEffect(() => {
      if (!audioRef.current) return;
      
      const desiredSrc = PLAYLIST[currentSongIndex];
      // Check if actually changing to avoid unnecessary reloads
      if (!audioRef.current.src.includes(desiredSrc)) {
          audioRef.current.src = desiredSrc;
          // If we were playing (or supposed to be playing), resume
          if (shouldPlayRef.current) {
              audioRef.current.play().catch(e => console.warn("Track change play failed", e));
          }
      }
  }, [currentSongIndex]);

  // --- Manual Controls ---

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    // NETWORK_NO_SOURCE = 3. Don't try to play if file is missing/broken.
    if (audioRef.current.networkState === 3) {
        console.warn("Cannot play: Source not found or not supported.");
        return;
    }

    try {
        if (audioRef.current.paused) {
            shouldPlayRef.current = true;
            await audioRef.current.play();
        } else {
            shouldPlayRef.current = false;
            audioRef.current.pause();
        }
    } catch (e) {
        console.error("Toggle failed:", e);
        setIsPlaying(!audioRef.current.paused);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
    localStorage.setItem('music_muted', String(newMuted));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-muted bg-cream selection:bg-primary selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/wishes" element={<Wishes />} />
          </Routes>
        </main>
        
        <Footer 
          togglePlay={togglePlay} 
          isPlaying={isPlaying}
          toggleMute={toggleMute}
          isMuted={isMuted}
          currentTrackIndex={currentSongIndex}
          totalTracks={PLAYLIST.length}
        />

        {/* Toast for Autoplay Blocked */}
        {showToast && !isPlaying && (
          <div 
            onClick={() => {
               togglePlay();
               setShowToast(false);
            }}
            className="fixed bottom-24 right-4 z-50 bg-primary text-white px-4 py-3 rounded-full shadow-lg cursor-pointer animate-bounce flex items-center gap-2"
          >
            <Music className="w-4 h-4" />
            <span className="text-sm font-medium">Tap to play music</span>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;