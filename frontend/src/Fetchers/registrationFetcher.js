import axios from 'axios';
import BASE_URL from "../../constants/baseUrl";
import { createWallet } from './walletFetcher';

// Function to handle user registration
async function registerUser(userData) {
    try {
        // Register the user
        const response = await axios.post(`${BASE_URL}/users`, {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            avatar: userData.avatar,
            password: userData.password
        }, {
            withCredentials: true,
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