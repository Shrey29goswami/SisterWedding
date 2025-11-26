import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { COUPLE, VENUE, IMAGES } from '../constants';
import Section from '../components/Section';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center text-center px-4">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${IMAGES.hero}')`, 
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-cream/80 via-transparent to-cream/80 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <p className="font-serif text-secondary tracking-[0.3em] uppercase text-sm md:text-base mb-4">
            || Om Sri Ganeshaya Namah ||
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 font-script text-primary">
            <span className="text-6xl md:text-8xl leading-tight">{COUPLE.bride.split(' ')[0]}</span>
            <span className="text-5xl md:text-6xl text-accent mt-2 md:mt-0 font-script">&</span>
            <span className="text-6xl md:text-8xl leading-tight">{COUPLE.groom.split(' ')[0]}</span>
          </div>

          <div className="space-y-2 pt-6">
            <p className="font-serif text-lg md:text-2xl text-muted italic">
              Request the pleasure of your company at our Wedding Ceremony
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 pt-8">
            <div className="flex items-center gap-3 text-muted">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-serif text-lg tracking-wide">{COUPLE.date}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-primary/30"></div>
            <div className="flex items-center gap-3 text-muted">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-serif text-lg tracking-wide">{VENUE.name}</span>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/rsvp" 
              className="px-8 py-3 bg-primary text-white font-serif uppercase tracking-widest hover:bg-primary/90 transition-all rounded shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              RSVP Now
            </Link>
            <Link 
              to="/events" 
              className="px-8 py-3 bg-transparent border border-primary text-primary font-serif uppercase tracking-widest hover:bg-primary hover:text-white transition-all rounded"
            >
              Event Details
            </Link>
          </div>
        </div>
      </div>

      {/* Parents Section */}
      <Section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-primary mb-12 relative inline-block">
             With The Blessings Of
             <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-accent/50"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 p-8 border border-accent/20 rounded-lg bg-cream/30">
              <h3 className="font-script text-3xl text-secondary">Bride's Family</h3>
              <div className="font-serif text-muted space-y-2">
                <p>{COUPLE.brideParents}</p>
                <p className="text-sm opacity-70 mt-4">Grandparents: Late Keshovati & Late Bhuvaneshwar Goswami</p>
              </div>
            </div>
            <div className="space-y-4 p-8 border border-accent/20 rounded-lg bg-cream/30">
              <h3 className="font-script text-3xl text-secondary">Groom's Family</h3>
              <div className="font-serif text-muted space-y-2">
                <p>{COUPLE.groomParents}</p>
                <p className="text-sm opacity-70 mt-4">Grandparents: Late Hira Devi & Late Narendra Nath Jha</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Decorative Divider */}
      <div className="h-24 bg-cream flex items-center justify-center overflow-hidden">
        <div className="flex space-x-4 opacity-30">
             {/* Simple Mandala Pattern CSS */}
             {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 border-2 border-primary rotate-45 transform"></div>
             ))}
        </div>
      </div>
    </div>
  );
};

export default Home;