import axios from 'axios';

// Function to handle user registration
async function registerUser(userData) {
    try {
        const response = await axios.post('http://localhost:5500/api/users/register', {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            avatar: userData.avatar,
            password: userData.password
        });

        console.log('Registration response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error;
    }
}

// Export the function for use in other files
export { registerUser }; 