import axios from 'axios';

// Function to handle user login
async function loginUser(email, password) {
    try {
        const response = await axios.post('http://localhost:5500/api/users/auth', {
            email,
            password
        });
        
        console.log('Login response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
}

// Export the function for use in other files
export { loginUser }; 