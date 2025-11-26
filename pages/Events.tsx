import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { EVENTS, VENUE } from '../constants';
import Section from '../components/Section';

const Events: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl text-primary mb-4">Celebration Timeline</h1>
          <p className="text-muted italic max-w-xl mx-auto">
            "Marriages are settled in heaven but celebrated on earth. The unity of two souls and the blending of two families."
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/20"></div>

          <div className="space-y-12">
            {EVENTS.map((event, index) => (
              <Section key={event.id} delay={index * 200}>
                <div className={`flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Date Circle for Mobile */}
                  <div className="md:hidden mb-4 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center font-serif text-sm text-center border-4 border-cream shadow-lg z-10">
                    {event.date.split(',')[1]}
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 !== 0 ? 'md:pl-8 text-left' : 'md:pr-8 md:text-right'} text-center md:text-inherit`}>
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-primary/5 hover:shadow-md transition-shadow">
                      <h3 className="font-serif text-2xl text-primary mb-2">{event.title}</h3>
                      
                      <div className={`flex flex-col gap-2 mb-4 text-sm text-secondary font-bold uppercase tracking-wide ${index % 2 !== 0 ? 'items-start' : 'items-center md:items-end'}`}>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>

                      <p className="text-muted mb-4 text-sm leading-relaxed">{event.description}</p>
                      
                      <div className={`text-xs text-muted/70 flex items-center gap-1 ${index % 2 === 0 ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
                         <MapPin className="w-3 h-3" />
                         {event.location}
                      </div>
                    </div>
                  </div>

                  {/* Center Dot for Desktop */}
                  <div className="hidden md:flex w-2/12 justify-center z-10 relative">
                     <div className="w-12 h-12 bg-cream border-2 border-primary rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                     </div>
                  </div>

                  {/* Empty space for alternate side with Visible Date Watermark */}
                  <div className="hidden md:block w-5/12">
                     <div className={`text-3xl font-script text-primary opacity-80 ${index % 2 !== 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        {event.date}
                     </div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>

        <Section className="mt-20 text-center bg-white p-8 rounded-xl border border-primary/10 shadow-lg">
           <h2 className="font-serif text-2xl text-primary mb-6">The Venue</h2>
           <p className="text-lg font-medium mb-2">{VENUE.name}</p>
           <p className="text-muted mb-8">{VENUE.address}</p>
           <a 
             href={VENUE.mapLink}
             target="_blank"
             rel="noreferrer"
             className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded hover:bg-secondary/90 transition-colors"
           >
             <MapPin className="w-5 h-5" />
             View on Google Maps
           </a>
        </Section>
      </div>
    </div>
  );
};

export default Events;