// Mock data for the application
// In a real application, this would come from an API/database

import { demoUsers } from './dummyData';

export const featuredItems = [
  {
    id: '1',
    title: 'Professional DSLR Camera',
    description: 'Canon EOS 5D Mark IV with 24-70mm lens, perfect for professional photography and video recording.',
    price: 75,
    priceUnit: 'day',
    rating: 4.9,
    reviews: 32,
    location: 'Seattle, WA',
    availability: 'Now',
    images: [
      'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'photography',
    owner: {
      id: 'user-1',
      name: 'Michael R.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.8,
      responseTime: '< 1 hour',
    },
    features: [
      '30.4 Megapixel Full-Frame CMOS Sensor',
      '4K Video Recording',
      'Includes 64GB Memory Card',
      'Extra Battery Included',
      'Waterproof Case',
    ],
    rules: [
      'ID required',
      'Security deposit: $500',
      'Return in original condition',
      'No international travel',
    ],
  },
  {
    id: '2',
    title: 'Mountain Bike - Trek Fuel EX',
    description: 'High-performance full suspension mountain bike, great for trails and mountain biking adventures.',
    price: 45,
    priceUnit: 'day',
    rating: 4.7,
    reviews: 18,
    location: 'Portland, OR',
    availability: 'Tomorrow',
    images: [
      'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'sports',
    owner: {
      id: 'user-2',
      name: 'Jessica T.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9,
      responseTime: 'within 2 hours',
    },
    features: [
      'Full suspension aluminum frame',
      'Hydraulic disc brakes',
      'Shimano components',
      'Size: Medium (fits 5\'5"-5\'10")',
      'Helmet included',
    ],
    rules: [
      'ID and credit card required',
      'Security deposit: $300',
      'Experience required',
      'Return cleaned and in working condition',
    ],
  },
  {
    id: '3',
    title: 'Camping Gear Set',
    description: 'Complete camping set with 4-person tent, sleeping bags, portable stove, and more. Perfect for weekend getaways.',
    price: 65,
    priceUnit: 'day',
    rating: 4.8,
    reviews: 27,
    location: 'Denver, CO',
    availability: 'Next week',
    images: [
      'https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/6271625/pexels-photo-6271625.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'camping',
    owner: {
      id: 'user-3',
      name: 'David K.',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.6,
      responseTime: 'within 1 day',
    },
    features: [
      '4-person waterproof tent',
      '4 sleeping bags rated for 30°F',
      'Portable camping stove with fuel',
      'Cookware set and utensils',
      'LED lanterns and flashlights',
    ],
    rules: [
      'ID required',
      'Security deposit: $200',
      'Return clean and dry',
      'Missing items will be charged',
    ],
  },
  {
    id: '4',
    title: 'MacBook Pro 16" M2',
    description: 'Latest Apple MacBook Pro with M2 chip, 16GB RAM and 1TB SSD. Perfect for designers and developers.',
    price: 60,
    priceUnit: 'day',
    rating: 4.9,
    reviews: 42,
    location: 'San Francisco, CA',
    availability: 'Now',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/705675/pexels-photo-705675.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'electronics',
    owner: {
      id: 'user-4',
      name: 'Sarah L.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5.0,
      responseTime: '< 1 hour',
    },
    features: [
      'M2 Pro chip with 12-core CPU',
      '16GB unified memory',
      '1TB SSD storage',
      '16-inch Liquid Retina XDR display',
      'Includes charger and protective case',
    ],
    rules: [
      'ID and credit card required',
      'Security deposit: $1000',
      'No international travel',
      'Software installation restrictions',
    ],
  },
  {
    id: '5',
    title: 'DJ Equipment Set',
    description: 'Professional DJ setup including Pioneer CDJ-3000s, DJM-900NXS2 mixer, and studio monitors. Perfect for events.',
    price: 150,
    priceUnit: 'day',
    rating: 4.7,
    reviews: 15,
    location: 'Los Angeles, CA',
    availability: 'Next weekend',
    images: [
      'https://images.pexels.com/photos/1540319/pexels-photo-1540319.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'electronics',
    owner: {
      id: 'user-5',
      name: 'Alex B.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9,
      responseTime: 'within 3 hours',
    },
    features: [
      '2 x Pioneer CDJ-3000 players',
      'Pioneer DJM-900NXS2 mixer',
      'KRK Rokit 8 studio monitors',
      'Headphones and all necessary cables',
      'Optional lighting equipment (+$50)',
    ],
    rules: [
      'Professional experience required',
      'Security deposit: $1500',
      'Pickup and return in person only',
      'Equipment inspection before and after',
    ],
  },
  {
    id: '6',
    title: 'Premium Road Bike - Specialized Tarmac',
    description: 'Professional carbon road bike, perfect for training or racing. Lightweight and aerodynamic design.',
    price: 55,
    priceUnit: 'day',
    rating: 4.8,
    reviews: 23,
    location: 'Austin, TX',
    availability: 'Now',
    images: [
      'https://images.pexels.com/photos/2158968/pexels-photo-2158968.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1431117/pexels-photo-1431117.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'sports',
    owner: {
      id: 'user-6',
      name: 'Ryan M.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.7,
      responseTime: 'within 4 hours',
    },
    features: [
      'Carbon fiber frame, size 56cm',
      'Shimano Ultegra groupset',
      'Carbon wheelset',
      'Includes helmet and bike lock',
      'Recently serviced',
    ],
    rules: [
      'ID and credit card required',
      'Security deposit: $500',
      'Cycling experience required',
      'Return clean and in working condition',
    ],
  },
  {
    id: '7',
    title: 'Power Tools Set',
    description: 'Complete set of DeWalt power tools including drill, impact driver, circular saw, and more. All battery powered.',
    price: 45,
    priceUnit: 'day',
    rating: 4.6,
    reviews: 31,
    location: 'Chicago, IL',
    availability: 'Tomorrow',
    images: [
      'https://images.pexels.com/photos/210881/pexels-photo-210881.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2085738/pexels-photo-2085738.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'tools',
    owner: {
      id: 'user-7',
      name: 'Marcus J.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9,
      responseTime: 'within 2 hours',
    },
    features: [
      'DeWalt 20V cordless drill',
      'Impact driver',
      'Circular saw and reciprocating saw',
      '3 batteries and charger',
      'Hard case for transport',
    ],
    rules: [
      'ID required',
      'Security deposit: $250',
      'Basic knowledge required',
      'Return in original condition with all pieces',
    ],
  },
  {
    id: '8',
    title: 'Digital Projector',
    description: 'Epson HD projector with 3000 lumens brightness. Great for home movie nights or business presentations.',
    price: 35,
    priceUnit: 'day',
    rating: 4.5,
    reviews: 19,
    location: 'Boston, MA',
    availability: 'Now',
    images: [
      'https://images.pexels.com/photos/2251206/pexels-photo-2251206.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2826131/pexels-photo-2826131.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'electronics',
    owner: {
      id: 'user-8',
      name: 'Emma W.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.7,
      responseTime: 'within 5 hours',
    },
    features: [
      'Epson HD projector (1080p)',
      '3000 lumens brightness',
      'HDMI and USB connections',
      'Portable screen included',
      'Built-in speaker',
    ],
    rules: [
      'ID required',
      'Security deposit: $200',
      'Indoor use only',
      'Return in original condition',
    ],
  },
];

export const recentItems = [
  {
    id: '9',
    title: 'Electric Scooter',
    description: 'Xiaomi Mi Pro 2 electric scooter with 28-mile range. Perfect for city commuting.',
    price: 25,
    priceUnit: 'day',
    rating: 4.6,
    reviews: 12,
    location: 'Miami, FL',
    availability: 'Now',
    images: [
      'https://images.pexels.com/photos/4347312/pexels-photo-4347312.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7925859/pexels-photo-7925859.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'vehicles',
    owner: {
      id: 'user-9',
      name: 'Carlos M.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.8,
      responseTime: 'within 1 hour',
    },
  },
  {
    id: '10',
    title: 'Drone with 4K Camera',
    description: 'DJI Mavic Air 2 drone with 4K camera and 34-minute flight time. Great for aerial photography.',
    price: 65,
    priceUnit: 'day',
    rating: 4.9,
    reviews: 8,
    location: 'Las Vegas, NV',
    availability: 'Tomorrow',
    images: [
      'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1034812/pexels-photo-1034812.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'photography',
    owner: {
      id: 'user-10',
      name: 'Tyler R.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.7,
      responseTime: '< 2 hours',
    },
  },
  {
    id: '11',
    title: 'Designer Handbag - Louis Vuitton',
    description: 'Authentic Louis Vuitton Neverfull MM tote bag. Perfect for special occasions.',
    price: 40,
    priceUnit: 'day',
    rating: 4.8,
    reviews: 15,
    location: 'New York, NY',
    availability: 'Next week',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1335463/pexels-photo-1335463.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'clothing',
    owner: {
      id: 'user-11',
      name: 'Olivia S.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9,
      responseTime: 'within 3 hours',
    },
  },
  {
    id: '12',
    title: 'Paddle Board Set',
    description: 'Inflatable stand-up paddle board with pump, paddle, and carrying case. Great for lake or ocean.',
    price: 35,
    priceUnit: 'day',
    rating: 4.7,
    reviews: 21,
    location: 'San Diego, CA',
    availability: 'Now',
    images: [
      'https://images.pexels.com/photos/1604869/pexels-photo-1604869.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3120232/pexels-photo-3120232.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'sports',
    owner: {
      id: 'user-12',
      name: 'Nick P.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.6,
      responseTime: 'within 4 hours',
    },
  },
];

// More mock data...

export const popularCategories = [
  {
    id: 'electronics',
    name: 'Electronics',
    count: 253,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'photography',
    name: 'Photography',
    count: 167,
    image: 'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'camping',
    name: 'Camping',
    count: 145,
    image: 'https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'sports',
    name: 'Sports',
    count: 198,
    image: 'https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export const testimonials = [
  {
    id: 1,
    text: "smartRent made it so easy to try out a high-end camera before investing in my own. The process was seamless and the equipment was in perfect condition.",
    author: "Jamie T.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    role: "Photography Enthusiast"
  },
  {
    id: 2,
    text: "As someone who enjoys camping but doesn't want to invest in all the gear, this platform is perfect. I've saved hundreds of dollars renting instead of buying.",
    author: "Mark R.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    role: "Occasional Camper"
  },
  {
    id: 3,
    text: "I made over $1,200 last month renting out my camera equipment and power tools that were just sitting in my closet. The extra income has been amazing!",
    author: "Sophia L.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    role: "Item Owner"
  }
];

export const mockListings = [
  {
    id: 'listing-1',
    title: 'Modern Downtown Apartment',
    description: 'A beautiful modern apartment in the heart of downtown. Perfect for business travelers and tourists alike.',
    price: 120,
    location: 'Downtown',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning', 'TV'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.michael,
    rating: 4.8,
    reviews: 24,
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'listing-2',
    title: 'Luxury Beachfront Villa',
    description: 'Experience luxury living with stunning ocean views in this beautiful beachfront villa.',
    price: 350,
    location: 'Beachfront',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ['Pool', 'WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning', 'TV', 'Parking'],
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.jessica,
    rating: 4.9,
    reviews: 18,
    isAvailable: true,
    createdAt: '2024-01-10T15:30:00Z'
  },
  {
    id: 'listing-3',
    title: 'Cozy Mountain Cabin',
    description: 'Escape to this charming cabin nestled in the mountains. Perfect for a peaceful retreat.',
    price: 95,
    location: 'Mountain View',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Hot Tub', 'Parking'],
    images: [
      'https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.david,
    rating: 4.7,
    reviews: 32,
    isAvailable: true,
    createdAt: '2024-01-05T09:15:00Z'
  },
  {
    id: 'listing-4',
    title: 'Stylish Urban Loft',
    description: 'A trendy loft apartment in the arts district with modern amenities and great city views.',
    price: 180,
    location: 'Arts District',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning', 'TV', 'Gym'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.sarah,
    rating: 4.6,
    reviews: 15,
    isAvailable: true,
    createdAt: '2024-01-20T11:45:00Z'
  },
  {
    id: 'listing-5',
    title: 'Family-Friendly Suburban Home',
    description: 'Spacious home in a quiet neighborhood, perfect for families and group stays.',
    price: 200,
    location: 'Suburbs',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning', 'TV', 'Backyard', 'Parking'],
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.alex,
    rating: 4.8,
    reviews: 28,
    isAvailable: true,
    createdAt: '2024-01-12T14:20:00Z'
  },
  {
    id: 'listing-6',
    title: 'Luxury Penthouse Suite',
    description: 'Experience the height of luxury in this stunning penthouse with panoramic city views.',
    price: 500,
    location: 'Financial District',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning', 'TV', 'Gym', 'Pool', 'Concierge'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.ryan,
    rating: 4.9,
    reviews: 12,
    isAvailable: true,
    createdAt: '2024-01-18T16:00:00Z'
  },
  {
    id: 'listing-7',
    title: 'Rustic Country House',
    description: 'A charming country house with modern amenities, surrounded by nature.',
    price: 150,
    location: 'Countryside',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Fireplace', 'Garden', 'Parking'],
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.marcus,
    rating: 4.7,
    reviews: 20,
    isAvailable: true,
    createdAt: '2024-01-08T13:45:00Z'
  },
  {
    id: 'listing-8',
    title: 'Modern Studio Apartment',
    description: 'A sleek and modern studio apartment in a prime location, perfect for solo travelers.',
    price: 90,
    location: 'City Center',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning', 'TV'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.emma,
    rating: 4.5,
    reviews: 16,
    isAvailable: true,
    createdAt: '2024-01-22T10:30:00Z'
  },
  {
    id: 'listing-9',
    title: 'Lakeside Cottage',
    description: 'A peaceful cottage by the lake, offering beautiful views and a relaxing atmosphere.',
    price: 160,
    location: 'Lakeside',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Boat Dock', 'Parking'],
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.carlos,
    rating: 4.8,
    reviews: 22,
    isAvailable: true,
    createdAt: '2024-01-14T12:15:00Z'
  },
  {
    id: 'listing-10',
    title: 'Historic Townhouse',
    description: 'A beautifully restored historic townhouse with modern comforts and classic charm.',
    price: 220,
    location: 'Historic District',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning', 'TV', 'Garden'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.tyler,
    rating: 4.7,
    reviews: 19,
    isAvailable: true,
    createdAt: '2024-01-16T09:45:00Z'
  },
  {
    id: 'listing-11',
    title: 'Seaside Bungalow',
    description: 'A cozy bungalow steps away from the beach, perfect for a seaside getaway.',
    price: 140,
    location: 'Seaside',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning', 'TV', 'Beach Access'],
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.olivia,
    rating: 4.6,
    reviews: 14,
    isAvailable: true,
    createdAt: '2024-01-19T11:30:00Z'
  },
  {
    id: 'listing-12',
    title: 'Modern High-Rise Apartment',
    description: 'A sleek apartment in a modern high-rise building with city views and premium amenities.',
    price: 190,
    location: 'Business District',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning', 'TV', 'Gym', 'Pool'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: demoUsers.nick,
    rating: 4.8,
    reviews: 17,
    isAvailable: true,
    createdAt: '2024-01-21T15:20:00Z'
  }
];

export const mockBookings = [
  {
    id: 'booking-1',
    listingId: 'listing-1',
    userId: 'user-1',
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    totalPrice: 480,
    status: 'confirmed',
    createdAt: '2024-01-25T10:00:00Z'
  },
  {
    id: 'booking-2',
    listingId: 'listing-2',
    userId: 'user-2',
    startDate: '2024-02-10',
    endDate: '2024-02-15',
    totalPrice: 1750,
    status: 'pending',
    createdAt: '2024-01-26T14:30:00Z'
  },
  {
    id: 'booking-3',
    listingId: 'listing-3',
    userId: 'user-3',
    startDate: '2024-02-20',
    endDate: '2024-02-22',
    totalPrice: 190,
    status: 'confirmed',
    createdAt: '2024-01-27T09:15:00Z'
  }
];

export const mockReviews = [
  {
    id: 'review-1',
    listingId: 'listing-1',
    userId: 'user-2',
    rating: 5,
    comment: 'Amazing place! The location was perfect and the apartment was exactly as described.',
    createdAt: '2024-01-15T16:00:00Z'
  },
  {
    id: 'review-2',
    listingId: 'listing-2',
    userId: 'user-3',
    rating: 4,
    comment: 'Beautiful villa with stunning views. Would definitely stay again!',
    createdAt: '2024-01-16T11:30:00Z'
  },
  {
    id: 'review-3',
    listingId: 'listing-3',
    userId: 'user-1',
    rating: 5,
    comment: 'Perfect getaway spot. The cabin was cozy and had everything we needed.',
    createdAt: '2024-01-17T14:45:00Z'
  }
];

export const getAdminUsers = () => {
  return Object.entries(demoUsers).map(([key, user]) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    role: user.role,
    status: 'active',
    joinedDate: '2024-01-01',
    lastLogin: new Date().toISOString(),
    listingsCount: mockListings.filter(listing => listing.owner.id === user.id).length,
    bookingsCount: mockBookings.filter(booking => booking.userId === user.id).length,
    balance: dummyBalances[user.id] || 0
  }));
};