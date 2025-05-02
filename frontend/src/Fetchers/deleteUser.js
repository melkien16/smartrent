import axios from "axios";
import BASE_URL from "../../constants/baseUrl";

async function deleteUser(userId) {
    try {
        const response = await axios.delete(
            `${BASE_URL}/users/${userId}`,
            {
                withCredentials: true,
            }
        );

        console.log("Delete user response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Delete user error:", error.response?.data || error.message);
        throw error;
    }
}

export { deleteUser }; 