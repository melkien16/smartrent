export const mockUsers = {
    admin: {
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=1',
        isPremium: true,
        rating: 5.0,
        location: 'San Francisco, CA',
        memberSince: 'January 2023',
        wallet: {
            balance: 0,
            transactions: [
                {
                    id: 'tx1',
                    amount: 1000,
                    type: 'deposit',
                    date: '2024-03-01',
                    description: 'Initial deposit'
                },
                {
                    id: 'tx2',
                    amount: -500,
                    type: 'withdrawal',
                    date: '2024-03-15',
                    description: 'Monthly salary'
                }
            ]
        }
    },
    user1: {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'john123',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=2',
        isPremium: true,
        rating: 4.8,
        location: 'New York, NY',
        memberSince: 'February 2023',
        wallet: {
            balance: 1250,
            transactions: [
                {
                    id: 'tx1',
                    amount: 500,
                    type: 'deposit',
                    date: '2024-02-15',
                    description: 'Initial deposit'
                },
                {
                    id: 'tx2',
                    amount: 300,
                    type: 'rental',
                    date: '2024-03-01',
                    description: 'Rental payment from Jane Smith'
                },
                {
                    id: 'tx3',
                    amount: 450,
                    type: 'rental',
                    date: '2024-03-10',
                    description: 'Rental payment from Michael Chen'
                }
            ]
        }
    },
    user2: {
        id: 'user2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'jane123',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=3',
        isPremium: false,
        rating: 4.5,
        location: 'Los Angeles, CA',
        memberSince: 'March 2023',
        wallet: {
            balance: 750,
            transactions: [
                {
                    id: 'tx1',
                    amount: 1000,
                    type: 'deposit',
                    date: '2024-03-01',
                    description: 'Initial deposit'
                },
                {
                    id: 'tx2',
                    amount: -300,
                    type: 'rental',
                    date: '2024-03-01',
                    description: 'Payment for camera rental'
                },
                {
                    id: 'tx3',
                    amount: 50,
                    type: 'rental',
                    date: '2024-03-15',
                    description: 'Rental payment from Sarah Johnson'
                }
            ]
        }
    }
}; 