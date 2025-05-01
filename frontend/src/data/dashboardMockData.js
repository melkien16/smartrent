export const dashboardMockData = {
    totalListings: 5,
    activeRentals: 3,
    walletBalance: 250.00,
    pendingBookings: 2,
    premiumStatus: 'Premium', // Changed from 'Basic' to 'Premium'

    // Additional mock data for different sections
    rentals: [
        {
            id: 1,
            itemName: 'Camera Equipment',
            owner: 'John Doe',
            status: 'Active',
            returnDate: '2024-03-15',
            image: '/images/camera.jpg'
        },
        {
            id: 2,
            itemName: 'Drone',
            owner: 'Jane Smith',
            status: 'Pending',
            returnDate: '2024-03-20',
            image: '/images/drone.jpg'
        }
    ],

    listings: [
        {
            id: 1,
            title: 'Professional Camera',
            price: 50,
            status: 'Active',
            image: '/images/camera.jpg'
        },
        {
            id: 2,
            title: 'DJI Drone',
            price: 75,
            status: 'Active',
            image: '/images/drone.jpg'
        }
    ],

    earnings: {
        total: 1250.00,
        thisMonth: 350.00,
        lastMonth: 450.00,
        chartData: [
            { month: 'Jan', amount: 300 },
            { month: 'Feb', amount: 450 },
            { month: 'Mar', amount: 350 }
        ]
    },

    wallet: {
        balance: 250.00,
        pendingDeposits: 50.00,
        recentTransactions: [
            { id: 1, type: 'deposit', amount: 100.00, date: '2024-03-01' },
            { id: 2, type: 'withdrawal', amount: 50.00, date: '2024-03-05' }
        ]
    },

    collateral: {
        total: 500.00,
        active: 300.00,
        available: 200.00,
        items: [
            { id: 1, item: 'Camera', amount: 200.00 },
            { id: 2, item: 'Drone', amount: 300.00 }
        ]
    },

    premium: {
        status: 'Premium',
        features: [
            'Priority Support',
            'Lower Commission Rates',
            'Advanced Analytics',
            'Custom Branding'
        ],
        renewalDate: '2024-12-31'
    }
}; 