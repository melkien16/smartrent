import axios from "axios";
import BASE_URL from "../../constants/baseUrl";

async function fetchWallets() {
  try {
    const response = await axios.get(`${BASE_URL}/wallets`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const wallets = response.data;
    console.log("Fetched wallets:", wallets);
    return wallets;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    throw error;
  }
}

export { fetchWallets };
