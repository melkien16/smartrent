import axios from 'axios';

// Function to fetch items from the backend using Axios
function fetchItems() {
    return axios.get('http://localhost:5500/api/items')
        .then((res) => {
            const items = res.data;
            console.log('Fetched items:', items);
            return items;
        })
        .catch((err) => {
            console.error('Error fetching items:', err);
            throw err;
        });
}

// Export the function for use in other files
export { fetchItems };
