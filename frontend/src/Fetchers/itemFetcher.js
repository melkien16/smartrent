import BASE_URL from "../../constants/baseUrl";
import axios from 'axios';

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
    const userId = JSON.parse(localStorage.getItem('smartRentUser'))?._id;
    const response = await axios.get(`${BASE_URL}/items`, {
      withCredentials: true
    });
    const items = response.data;
    // Filter items by owner ID
    const ownerItems = items.filter(item => item.owner._id === userId);
    console.log(`Fetched ${ownerItems.length} items for owner ${userId}`);
    return ownerItems;
  } catch (error) {
    console.error("Error fetching items by owner:", error);
    throw error;
  }
}

// Function to create a new item
async function createItem(itemData) {
  try {
    const response = await axios.post(`${BASE_URL}/items`, itemData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Created new item:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}

// Export the functions for use in other files
export { fetchItems, fetchItemsByOwner, createItem };
