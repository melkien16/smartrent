import axios from "axios";
import BASE_URL from "../../constants/baseUrl";

async function getAllUsers() {
    try {
        const response = await axios.get(
            `${BASE_URL}/users`,
            {
                withCredentials: true,
            }
        );

        console.log("Get all users response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get all users error:", error.response?.data || error.message);
        throw error;
    }
}

export { getAllUsers }; 