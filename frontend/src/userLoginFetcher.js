import axios from "axios";

async function loginUser(email, password) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/auth",
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
