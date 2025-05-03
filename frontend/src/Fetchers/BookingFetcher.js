import BASE_URL from "../../constants/baseUrl";
import axios from 'axios';

// Function to fetch bookings by user ID
async function fetchBookingsByUser() {
    try {
        const userId = JSON.parse(localStorage.getItem('smartRentUser'))?._id;
        const response = await axios.get(`${BASE_URL}/bookings/user/${userId}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(`Fetched ${response.data.length} bookings for user ${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching bookings by user:", error);
        throw error;
    }
}

// Export the functions for use in other files
export { fetchBookingsByUser }; 