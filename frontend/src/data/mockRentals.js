export const mockRentals = {
    active: [
        {
            id: 'rental1',
            item: {
                id: 'item1',
                title: 'Professional Camera',
                image: '/images/camera.jpg'
            },
            renter: {
                id: 'user2',
                name: 'Jane Smith',
                avatar: 'https://i.pravatar.cc/150?img=3'
            },
            startDate: '2024-03-15',
            endDate: '2024-03-20',
            totalPrice: 250,
            status: 'active',
            paymentStatus: 'completed',
            deposit: 200,
            depositStatus: 'held'
        },
        {
            id: 'rental2',
            item: {
                id: 'item2',
                title: 'DJI Drone',
                image: '/images/drone.jpg'
            },
            renter: {
                id: 'user1',
                name: 'John Doe',
                avatar: 'https://i.pravatar.cc/150?img=2'
            },
            startDate: '2024-03-18',
            endDate: '2024-03-22',
            totalPrice: 300,
            status: 'active',
            paymentStatus: 'completed',
            deposit: 300,
            depositStatus: 'held'
        }
    ],
    pending: [
        {
            id: 'rental3',
            item: {
                id: 'item3',
                title: 'Camping Tent',
                image: '/images/tent.jpg'
            },
            renter: {
                id: 'user2',
                name: 'Jane Smith',
                avatar: 'https://i.pravatar.cc/150?img=3'
            },
            startDate: '2024-03-25',
            endDate: '2024-03-28',
            totalPrice: 75,
            status: 'pending',
            paymentStatus: 'pending',
            deposit: 100,
            depositStatus: 'pending'
        }
    ],
    completed: [
        {
            id: 'rental4',
            item: {
                id: 'item4',
                title: 'Mountain Bike',
                image: '/images/bike.jpg'
            },
            renter: {
                id: 'user1',
                name: 'John Doe',
                avatar: 'https://i.pravatar.cc/150?img=2'
            },
            startDate: '2024-03-01',
            endDate: '2024-03-05',
            totalPrice: 160,
            status: 'completed',
            paymentStatus: 'completed',
            deposit: 250,
            depositStatus: 'returned',
            rating: 5,
            review: 'Great bike, perfect condition!'
        }
    ]
}; 