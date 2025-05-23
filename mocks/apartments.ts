import { Apartment } from "@/types/apartment";

export const apartments: Apartment[] = [
  {
    id: "1",
    title: "Modern Studio in Downtown",
    description: "Bright and airy studio apartment in the heart of downtown. Features floor-to-ceiling windows with stunning city views, modern furnishings, and a fully equipped kitchen. Perfect for professionals or couples looking for a central location with easy access to restaurants, shopping, and public transportation.",
    price: 1200,
    currency: "USD",
    location: {
      city: "San Francisco",
      neighborhood: "Financial District",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    bedrooms: 0,
    bathrooms: 1,
    size: 45,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "Washer", "Elevator"],
    rating: 4.8,
    reviews: 124,
    host: {
      id: "h1",
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      superhost: true,
    },
    available: true,
    featured: true,
  },
  {
    id: "2",
    title: "Luxury 2BR with Ocean View",
    description: "Stunning luxury apartment with breathtaking ocean views from every room. This spacious 2-bedroom, 2-bathroom unit features high-end finishes, a gourmet kitchen with stainless steel appliances, and a large balcony perfect for enjoying sunsets. Building amenities include a pool, fitness center, and 24-hour concierge.",
    price: 3500,
    currency: "USD",
    location: {
      city: "Miami",
      neighborhood: "South Beach",
      coordinates: {
        latitude: 25.7617,
        longitude: -80.1918,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    bedrooms: 2,
    bathrooms: 2,
    size: 110,
    amenities: ["WiFi", "Pool", "Gym", "Parking", "Doorman", "Ocean View", "Balcony"],
    rating: 4.9,
    reviews: 87,
    host: {
      id: "h2",
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      superhost: true,
    },
    available: true,
    featured: true,
  },
  {
    id: "3",
    title: "Cozy 1BR in Historic District",
    description: "Charming one-bedroom apartment in a beautifully restored historic building. Features original hardwood floors, exposed brick walls, and modern amenities. Located in a quiet, tree-lined street within walking distance to cafes, boutiques, and parks. Perfect for those seeking character and convenience.",
    price: 1800,
    currency: "USD",
    location: {
      city: "Boston",
      neighborhood: "Beacon Hill",
      coordinates: {
        latitude: 42.3601,
        longitude: -71.0589,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    bedrooms: 1,
    bathrooms: 1,
    size: 65,
    amenities: ["WiFi", "Heating", "Kitchen", "Washer/Dryer", "Historic Building"],
    rating: 4.7,
    reviews: 56,
    host: {
      id: "h3",
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      superhost: false,
    },
    available: true,
    featured: false,
  },
  {
    id: "4",
    title: "Minimalist Loft in Arts District",
    description: "Industrial-chic loft in the vibrant Arts District. This open-concept space features soaring ceilings, large windows, and polished concrete floors. The apartment comes with a fully equipped kitchen, custom furniture, and unique art pieces. Steps away from galleries, craft breweries, and trendy restaurants.",
    price: 2200,
    currency: "USD",
    location: {
      city: "Los Angeles",
      neighborhood: "Arts District",
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    bedrooms: 1,
    bathrooms: 1,
    size: 85,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "Workspace", "Rooftop Access"],
    rating: 4.6,
    reviews: 92,
    host: {
      id: "h4",
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      superhost: false,
    },
    available: true,
    featured: false,
  },
  {
    id: "5",
    title: "Stylish 3BR Family Apartment",
    description: "Spacious and bright 3-bedroom apartment perfect for families. Features a large living area, modern kitchen with island, and a dedicated children's playroom. Located in a family-friendly neighborhood with parks, schools, and shopping centers nearby. Building includes playground and secure parking.",
    price: 2800,
    currency: "USD",
    location: {
      city: "Chicago",
      neighborhood: "Lincoln Park",
      coordinates: {
        latitude: 41.8781,
        longitude: -87.6298,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    bedrooms: 3,
    bathrooms: 2,
    size: 130,
    amenities: ["WiFi", "Parking", "Playground", "Washer/Dryer", "Dishwasher", "Family-friendly"],
    rating: 4.8,
    reviews: 45,
    host: {
      id: "h5",
      name: "Jennifer Taylor",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      superhost: true,
    },
    available: true,
    featured: true,
  },
  {
    id: "6",
    title: "Penthouse with Private Terrace",
    description: "Luxurious penthouse apartment with a private rooftop terrace offering panoramic city views. This exclusive residence features premium finishes, floor-to-ceiling windows, and an open floor plan perfect for entertaining. The master suite includes a spa-like bathroom and walk-in closet. Building amenities include concierge, valet parking, and fitness center.",
    price: 5000,
    currency: "USD",
    location: {
      city: "New York",
      neighborhood: "Tribeca",
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    bedrooms: 2,
    bathrooms: 2.5,
    size: 150,
    amenities: ["WiFi", "Terrace", "Doorman", "Gym", "Parking", "City View", "Concierge"],
    rating: 4.9,
    reviews: 32,
    host: {
      id: "h6",
      name: "Robert Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      superhost: true,
    },
    available: true,
    featured: true,
  },
];