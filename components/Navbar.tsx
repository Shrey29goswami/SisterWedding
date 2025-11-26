import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/wishes', label: 'Wishes' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-cream/90 backdrop-blur-sm border-b border-primary/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary animate-pulse" />
            <span className="font-script text-3xl text-primary font-bold pt-2">S & R</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-serif text-sm uppercase tracking-widest hover:text-primary transition-colors duration-200 ${
                  isActive(link.path) ? 'text-primary font-bold border-b-2 border-primary' : 'text-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/rsvp"
              className="bg-primary text-white px-6 py-2 rounded-full font-serif text-sm tracking-widest hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              RSVP
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-primary/80 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-paper absolute w-full border-b border-primary/10 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 rounded-md text-base font-serif uppercase tracking-widest ${
                  isActive(link.path) ? 'text-primary bg-primary/5' : 'text-muted hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/rsvp"
              onClick={() => setIsOpen(false)}
              className="block w-full mt-4 px-5 py-3 rounded-md font-serif text-white bg-primary hover:bg-opacity-90"
            >
              RSVP
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;