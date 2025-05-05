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
      
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export { loginUser };
