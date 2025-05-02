import axios from 'axios';
import BASE_URL from '../constants/baseUrl';

// Function to fetch items from the backend using Axios
async function  fetchItems() {
    return axios.get(`${BASE_URL}/items`)
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
