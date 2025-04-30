const  items = [
  {
    title: "Professional DSLR Camera",
    description:
      "Canon EOS 5D Mark IV with 24-70mm lens, perfect for professional photography and video recording.",
    price: 75,
    priceUnit: "day",
    rating: 4.9,
    reviews: 32,
    location: "Seattle, WA",
    availability: "Now",
    images: [
      "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "photography",
    owner: "644e3d1e2c4a6343f0f4a8b1", // replace with actual User _id
    features: [
      "30.4 Megapixel Full-Frame CMOS Sensor",
      "4K Video Recording",
      "Includes 64GB Memory Card",
      "Extra Battery Included",
      "Waterproof Case",
    ],
    rules: [
      "ID required",
      "Security deposit: $500",
      "Return in original condition",
      "No international travel",
    ],
  },
  {
    title: "Mountain Bike - Trek Fuel EX",
    description:
      "High-performance full suspension mountain bike, great for trails and mountain biking adventures.",
    price: 45,
    priceUnit: "day",
    rating: 4.7,
    reviews: 18,
    location: "Portland, OR",
    availability: "Tomorrow",
    images: [
      "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "sports",
    owner: "644e3d1e2c4a6343f0f4a8b2",
    features: [
      "Full suspension aluminum frame",
      "Hydraulic disc brakes",
      "Shimano components",
      "Size: Medium (fits 5'5\"-5'10\")",
      "Helmet included",
    ],
    rules: [
      "ID and credit card required",
      "Security deposit: $300",
      "Experience required",
      "Return cleaned and in working condition",
    ],
  },
  {
    title: 'MacBook Pro 16" M2',
    description:
      "Latest Apple MacBook Pro with M2 chip, 16GB RAM and 1TB SSD. Perfect for designers and developers.",
    price: 60,
    priceUnit: "day",
    rating: 4.9,
    reviews: 42,
    location: "San Francisco, CA",
    availability: "Now",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/705675/pexels-photo-705675.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "electronics",
    owner: "644e3d1e2c4a6343f0f4a8b3",
    features: [
      "M2 Pro chip with 12-core CPU",
      "16GB unified memory",
      "1TB SSD storage",
      "16-inch Liquid Retina XDR display",
      "Includes charger and protective case",
    ],
    rules: [
      "ID and credit card required",
      "Security deposit: $1000",
      "No international travel",
      "Software installation restrictions",
    ],
  },
];

export default items;
