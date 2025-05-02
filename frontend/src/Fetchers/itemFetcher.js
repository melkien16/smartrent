// Function to fetch items from the backend
async function fetchItems() {
  try {
    const response = await fetch("http://localhost:5000/api/items");

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

// Export the function for use in other files
export { fetchItems };
