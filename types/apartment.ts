export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    city: string;
    neighborhood: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  images: string[];
  bedrooms: number;
  bathrooms: number;
  size: number; // in square meters/feet
  amenities: string[];
  rating: number;
  reviews: number;
  host: {
    id: string;
    name: string;
    avatar: string;
    superhost: boolean;
  };
  available: boolean;
  featured: boolean;
}