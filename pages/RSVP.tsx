import React, { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Guest } from '../types';
import Section from '../components/Section';

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<Guest>({
    name: '',
    email: '',
    attending: 'yes',
    guestsCount: 1,
    dietary: 'none',
    songRequest: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Check local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wedding_rsvp');
    if (saved) {
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    // Simulate API call and save to local storage
    setTimeout(() => {
      localStorage.setItem('wedding_rsvp', JSON.stringify(formData));
      setSubmitted(true);
      
      // Trigger confetti (using simple CSS animation approach in index.html or just rely on the UI feedback)
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
        <div className="bg-white p-12 rounded-lg shadow-xl text-center max-w-lg w-full border-t-4 border-primary animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-serif text-3xl text-primary mb-4">Thank You!</h2>
          <p className="text-muted text-lg mb-8">
            Your RSVP has been recorded. We can't wait to celebrate with you! 🎉
          </p>
          <button 
            onClick={() => {
               localStorage.removeItem('wedding_rsvp');
               setSubmitted(false);
               setFormData({ name: '', email: '', attending: 'yes', guestsCount: 1, dietary: 'none' });
            }}
            className="text-sm text-secondary hover:underline"
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-primary mb-4">RSVP</h1>
          <p className="text-muted">Please respond by November 20, 2025</p>
        </div>

        <Section className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-primary/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-muted uppercase tracking-wide">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="Guest Name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-muted uppercase tracking-wide">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-muted uppercase tracking-wide">Will you be attending?</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded flex-1 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleChange}
                    className="text-primary focus:ring-primary"
                  />
                  <span>Joyfully Accept</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded flex-1 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleChange}
                    className="text-primary focus:ring-primary"
                  />
                  <span>Regretfully Decline</span>
                </label>
              </div>
            </div>

            {formData.attending === 'yes' && (
              <div className="animate-fade-in-up space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="block text-sm font-bold text-muted uppercase tracking-wide">Number of Guests</label>
                    <select
                      name="guestsCount"
                      value={formData.guestsCount}
                      // @ts-ignore
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded border border-gray-200 focus:border-primary outline-none bg-white"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-muted uppercase tracking-wide">Dietary Preferences</label>
                    <select
                      name="dietary"
                      value={formData.dietary}
                      // @ts-ignore
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded border border-gray-200 focus:border-primary outline-none bg-white"
                    >
                      <option value="none">No Restrictions</option>
                      <option value="veg">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="gluten-free">Gluten Free</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-muted uppercase tracking-wide">Song Request</label>
                  <input
                    type="text"
                    name="songRequest"
                    value={formData.songRequest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded border border-gray-200 focus:border-primary outline-none"
                    placeholder="I bet you look good on the dancefloor..."
                  />
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-primary text-white font-serif uppercase tracking-widest py-4 rounded hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Send RSVP</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </Section>
      </div>
    </div>
  );
};

export default RSVP;
