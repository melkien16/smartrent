import BASE_URL from "../../constants/baseUrl";
import axios from "axios";

// Function to fetch items from the backend
async function fetchItems() {
  try {
    const response = await axios.get(`${BASE_URL}/items`);
    console.log("Fetched items:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

// Function to fetch items by owner ID
async function fetchItemsByOwner() {
  try {
    const userId = JSON.parse(localStorage.getItem("smartRentUser"))?._id;
    const response = await axios.get(`${BASE_URL}/items`);
    const items = response.data;
    // Filter items by owner ID
    const ownerItems = items.filter((item) => item.owner._id === userId);
    return ownerItems;
  } catch (error) {
    throw error;
  }
}

// Function to create a new item
async function createItem(itemData) {
  try {
    const response = await axios.post(`${BASE_URL}/items`, itemData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Export the functions for use in other files
export { fetchItems, fetchItemsByOwner, createItem };
