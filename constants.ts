import { EventDetails, RegistryItem } from './types';

export const COUPLE = {
  bride: "Smriti Goswami",
  groom: "Rishi Raj Kashyap",
  brideParents: "Mrs. Bina Goswami & Dr. Binod Kumar Goswami",
  groomParents: "Mrs. Ranju Kumari & Mr. Rabindra Kumar",
  hashtag: "#RishiKiSmriti",
  date: "December 1, 2025"
};

export const VENUE = {
  name: "The Reet Resort",
  address: "Velatand, Eight Lane Road, Dhanbad, Jharkhand - 828109",
  mapLink: "https://www.google.com/maps/search/?api=1&query=The+Reet+Resort+Dhanbad"
};

// NOTE: You can replace these URLs with local paths (e.g., '/assets/images/hero-bg.jpg') when you have the files ready.
export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2000&auto=format&fit=crop', // Traditional Indian Wedding Background
  couple: 'https://images.unsplash.com/photo-1605218427368-35b84d41e737?q=80&w=1000&auto=format&fit=crop', // Couple Photo
  gallery: [
    'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587271339318-2e82b7ca58a8?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595535775535-643950b73c91?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1621624683053-5290b2302390?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1632757421307-e43596700055?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop',
  ]
};

// Extracted from Image 2 (Timeline)
export const EVENTS: EventDetails[] = [
  {
    id: 'lagan',
    title: "Lagan & Matkor",
    date: "Thursday, Nov 27, 2025",
    time: "Evening",
    location: "Home Residence / The Reet Resort",
    description: "Traditional pre-wedding rituals initiating the festivities.",
    icon: 'ring'
  },
  {
    id: 'sangeet',
    title: "Devpujan, Mehendi & Sangeet",
    date: "Sunday, Nov 30, 2025",
    time: "All Day Event",
    location: "The Reet Resort",
    description: "A day filled with colors, henna application, and musical performances.",
    icon: 'music'
  },
  {
    id: 'wedding',
    title: "The Wedding Ceremony",
    date: "Monday, Dec 01, 2025",
    time: "07:00 PM onwards",
    location: "The Reet Resort",
    description: "Barat Aagman followed by Shubh Vivah and Pritibhoj.",
    icon: 'heart'
  }
];

export const MOCK_REGISTRY: RegistryItem[] = [];