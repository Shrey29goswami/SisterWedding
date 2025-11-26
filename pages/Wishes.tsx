import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Wish } from '../types';
import Section from '../components/Section';

const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });

  useEffect(() => {
    // Load from local storage or start empty
    // Changed key to v2 to ensure list starts empty as requested
    const stored = localStorage.getItem('wedding_wishes_v2');
    if (stored) {
      setWishes(JSON.parse(stored));
    } else {
      setWishes([]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name || !newWish.message) return;

    const wish: Wish = {
      id: Date.now().toString(),
      name: newWish.name,
      message: newWish.message,
      timestamp: Date.now(),
      likes: 0
    };

    const updated = [wish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_wishes_v2', JSON.stringify(updated));
    setNewWish({ name: '', message: '' });
  };

  const handleLike = (id: string) => {
    const updated = wishes.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w);
    setWishes(updated);
    localStorage.setItem('wedding_wishes_v2', JSON.stringify(updated));
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-primary mb-4">Guestbook</h1>
          <p className="text-muted">Drop your love for the couple — GIFs and emojis allowed!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-1">
             <div className="bg-white p-6 rounded-lg shadow-md border border-primary/10 sticky top-28">
               <h3 className="font-serif text-xl mb-4 text-secondary">Leave a Note</h3>
               <form onSubmit={handleSubmit} className="space-y-4">
                 <input
                   className="w-full p-3 border rounded focus:border-primary outline-none"
                   placeholder="Your Name"
                   value={newWish.name}
                   onChange={e => setNewWish({...newWish, name: e.target.value})}
                 />
                 <textarea
                   className="w-full p-3 border rounded focus:border-primary outline-none h-32 resize-none"
                   placeholder="Write something sweet..."
                   value={newWish.message}
                   onChange={e => setNewWish({...newWish, message: e.target.value})}
                 />
                 <button className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary/90 transition-colors uppercase text-sm tracking-wide">
                   Post Wish
                 </button>
               </form>
             </div>
          </div>

          {/* List */}
          <div className="md:col-span-2 space-y-6">
            {wishes.map((wish) => (
              <Section key={wish.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-serif text-lg text-primary">{wish.name}</h4>
                  <span className="text-xs text-muted/50">{new Date(wish.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="text-muted mb-4 font-light">{wish.message}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => handleLike(wish.id)}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wish.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{wish.likes} Love</span>
                  </button>
                </div>
              </Section>
            ))}
            
            {wishes.length === 0 && (
              <div className="text-center py-12 opacity-50">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-primary/40" />
                <p>Be the first to wish the couple!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishes;