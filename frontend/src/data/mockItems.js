export const mockItems = {
    featured: [
        {
            id: 'item1',
            title: 'Professional Camera',
            description: 'High-end DSLR camera with multiple lenses',
            price: 50,
            priceUnit: 'day',
            category: 'Electronics',
            location: 'San Francisco, CA',
            images: ['/images/camera.jpg'],
            owner: {
                id: 'user1',
                name: 'John Doe',
                avatar: 'https://i.pravatar.cc/150?img=2'
            },
            rating: 4.8,
            reviews: 12,
            isAvailable: true,
            features: ['4K Video', 'Multiple Lenses', 'Tripod Included'],
            deposit: 200
        },
        {
            id: 'item2',
            title: 'DJI Drone',
            description: 'Professional drone with 4K camera',
            price: 75,
            priceUnit: 'day',
            category: 'Electronics',
            location: 'Los Angeles, CA',
            images: ['/images/drone.jpg'],
            owner: {
                id: 'user2',
                name: 'Jane Smith',
                avatar: 'https://i.pravatar.cc/150?img=3'
            },
            rating: 4.9,
            reviews: 8,
            isAvailable: true,
            features: ['4K Camera', '30min Flight Time', 'Carrying Case'],
            deposit: 300
        }
    ],
    recent: [
        {
            id: 'item3',
            title: 'Camping Tent',
            description: '4-person tent with rain cover',
            price: 25,
            priceUnit: 'day',
            category: 'Outdoor',
            location: 'Seattle, WA',
            images: ['/images/tent.jpg'],
            owner: {
                id: 'user1',
                name: 'John Doe',
                avatar: 'https://i.pravatar.cc/150?img=2'
            },
            rating: 4.7,
            reviews: 5,
            isAvailable: true,
            features: ['4-Person Capacity', 'Rain Cover', 'Easy Setup'],
            deposit: 100
        },
        {
            id: 'item4',
            title: 'Mountain Bike',
            description: 'Professional mountain bike with suspension',
            price: 40,
            priceUnit: 'day',
            category: 'Sports',
            location: 'Denver, CO',
            images: ['/images/bike.jpg'],
            owner: {
                id: 'user2',
                name: 'Jane Smith',
                avatar: 'https://i.pravatar.cc/150?img=3'
            },
            rating: 4.6,
            reviews: 3,
            isAvailable: true,
            features: ['Full Suspension', 'Helmet Included', 'Repair Kit'],
            deposit: 250
        }
    ]
}; 