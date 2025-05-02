export const mockCategories = {
    popular: [
        {
            id: 'electronics',
            name: 'Electronics',
            count: 156,
            image: '/images/categories/electronics.jpg'
        },
        {
            id: 'outdoor',
            name: 'Outdoor Gear',
            count: 98,
            image: '/images/categories/outdoor.jpg'
        },
        {
            id: 'tools',
            name: 'Tools',
            count: 87,
            image: '/images/categories/tools.jpg'
        },
        {
            id: 'sports',
            name: 'Sports Equipment',
            count: 112,
            image: '/images/categories/sports.jpg'
        }
    ],
    all: [
        {
            id: 'electronics',
            name: 'Electronics',
            count: 156,
            image: '/images/categories/electronics.jpg',
            subcategories: ['Cameras', 'Drones', 'Audio Equipment', 'Computers']
        },
        {
            id: 'outdoor',
            name: 'Outdoor Gear',
            count: 98,
            image: '/images/categories/outdoor.jpg',
            subcategories: ['Camping', 'Hiking', 'Fishing', 'Water Sports']
        },
        {
            id: 'tools',
            name: 'Tools',
            count: 87,
            image: '/images/categories/tools.jpg',
            subcategories: ['Power Tools', 'Hand Tools', 'Garden Tools', 'Construction']
        },
        {
            id: 'sports',
            name: 'Sports Equipment',
            count: 112,
            image: '/images/categories/sports.jpg',
            subcategories: ['Fitness', 'Team Sports', 'Individual Sports', 'Water Sports']
        },
        {
            id: 'vehicles',
            name: 'Vehicles',
            count: 45,
            image: '/images/categories/vehicles.jpg',
            subcategories: ['Bikes', 'Scooters', 'Boats', 'Recreational Vehicles']
        },
        {
            id: 'party',
            name: 'Party & Events',
            count: 67,
            image: '/images/categories/party.jpg',
            subcategories: ['Tables & Chairs', 'Tents', 'Audio/Visual', 'Decorations']
        }
    ]
}; 