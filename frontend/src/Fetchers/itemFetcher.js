import BASE_URL from "../../constants/baseUrl";

// Function to fetch items from the backend
async function fetchItems() {
  try {
    const response = await fetch(`${BASE_URL}/items`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const items = await response.json();
    console.log("Fetched items:", items);
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

const userId = JSON.parse(localStorage.getItem('smartRentUser'))?._id;
// Function to fetch items by owner ID
async function fetchItemsByOwner() {
  try {
    const response = await fetch(`${BASE_URL}/items`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const items = await response.json();

    // Filter items by owner ID
    const ownerItems = items.filter(item => item.owner === userId);

    console.log(`Fetched ${ownerItems.length} items for owner ${userId}`);
    return ownerItems;
  } catch (error) {
    console.error("Error fetching items by owner:", error);
    throw error;
  }
}

// Export the functions for use in other files
export { fetchItems, fetchItemsByOwner };
