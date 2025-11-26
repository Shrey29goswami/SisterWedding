import React, { useState, useEffect } from 'react';
import { Gift, Bookmark, ExternalLink } from 'lucide-react';
import { MOCK_REGISTRY } from '../constants';
import { RegistryItem } from '../types';
import Section from '../components/Section';

const Registry: React.FC = () => {
  const [items, setItems] = useState<RegistryItem[]>(MOCK_REGISTRY);

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem('saved_gifts') || '[]');
    setItems(current => current.map(item => ({
      ...item,
      saved: savedIds.includes(item.id)
    })));
  }, []);

  const toggleSave = (id: string) => {
    const newItems = items.map(item => {
      if (item.id === id) return { ...item, saved: !item.saved };
      return item;
    });
    setItems(newItems);
    
    const savedIds = newItems.filter(i => i.saved).map(i => i.id);
    localStorage.setItem('saved_gifts', JSON.stringify(savedIds));
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl text-primary mb-4">Gift Registry</h1>
          <p className="text-muted max-w-lg mx-auto">
            Your presence is the greatest gift of all. However, should you wish to honour us with a gift, we have put together a small list.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Section key={item.id} delay={index * 100} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <button
                  onClick={() => toggleSave(item.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-primary hover:text-white transition-colors"
                  aria-label="Save for later"
                >
                  <Bookmark className={`w-5 h-5 ${item.saved ? 'fill-primary text-primary hover:text-white' : ''}`} />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="font-serif text-xl text-primary mb-1">{item.title}</h3>
                <p className="text-secondary font-medium mb-4">{item.price}</p>
                
                <a 
                  href={item.link}
                  className="block w-full text-center border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white transition-colors uppercase text-sm tracking-widest flex items-center justify-center gap-2"
                >
                  View Details
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Section>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-paper p-8 rounded-lg border border-accent/20 max-w-2xl mx-auto">
          <Gift className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-serif text-xl mb-2">No Boxed Gifts, Please</h3>
          <p className="text-muted text-sm">
             We request no boxed gifts at the venue as we will be travelling. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registry;
