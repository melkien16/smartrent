import axios from "axios";
import BASE_URL from "../../constants/baseUrl";

async function loginUser(email, password) {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/auth`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
}

export { loginUser };
