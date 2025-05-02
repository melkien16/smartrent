import axios from "axios";

async function loginUser(email, password) {
<<<<<<< HEAD:frontend/src/userLoginFetcher.js
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
=======
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
>>>>>>> 3a93e4b86617846e290e7c1a0effa7d14934882b:frontend/src/Fetchers/userLoginFetcher.js
}

export { loginUser };
