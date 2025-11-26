import React from 'react';
import Section from '../components/Section';

const Story: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl text-primary mb-4">Our Story</h1>
          <p className="text-muted italic">"Two souls, one heart."</p>
        </div>

        <div className="space-y-16 relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/20"></div>

          {/* Event 1 */}
          <Section className="relative flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 pr-8 md:text-right pl-12 md:pl-0">
               <h3 className="font-serif text-2xl text-primary">The First Meeting</h3>
               <span className="text-secondary font-bold text-sm uppercase tracking-widest block mb-2">2023</span>
               <p className="text-muted">Like a scene from a movie, we met under the most unexpected circumstances. A shared smile turned into a conversation that lasted hours.</p>
            </div>
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-cream"></div>
            <div className="md:w-1/2 pl-12 pt-4 md:pt-0">
               <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Couple" />
               </div>
            </div>
          </Section>

          {/* Event 2 */}
          <Section className="relative flex flex-col md:flex-row-reverse items-center" delay={200}>
            <div className="md:w-1/2 pl-12 md:pl-8 text-left">
               <h3 className="font-serif text-2xl text-primary">The Proposal</h3>
               <span className="text-secondary font-bold text-sm uppercase tracking-widest block mb-2">2024</span>
               <p className="text-muted">Surrounded by friends and the golden sunset, Rishi asked the question, and Smriti said yes!</p>
            </div>
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-cream"></div>
            <div className="md:w-1/2 pr-8 md:pr-12 pl-12 md:pl-0 pt-4 md:pt-0">
               <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img src="https://images.unsplash.com/photo-1522673607200-1645062cd958?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Proposal" />
               </div>
            </div>
          </Section>

           {/* Event 3 */}
           <Section className="relative flex flex-col md:flex-row items-center" delay={400}>
            <div className="md:w-1/2 pr-8 md:text-right pl-12 md:pl-0">
               <h3 className="font-serif text-2xl text-primary">The Beginning</h3>
               <span className="text-secondary font-bold text-sm uppercase tracking-widest block mb-2">Dec 1, 2025</span>
               <p className="text-muted">The day we start our forever.</p>
            </div>
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-cream"></div>
            <div className="md:w-1/2 pl-12 pt-4 md:pt-0">
                 {/* Placeholder for future photo */}
                 <div className="w-full h-48 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center text-primary/50 bg-white">
                    Photo to come
                 </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Story;
