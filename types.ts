export interface EventDetails {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  icon: 'ring' | 'music' | 'camera' | 'heart' | 'utensils';
}

export interface Guest {
  name: string;
  email: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  dietary: 'veg' | 'vegan' | 'gluten-free' | 'none';
  songRequest?: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
  likes: number;
}

export interface RegistryItem {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
  saved: boolean;
}
