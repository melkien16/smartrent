import axios from 'axios';
import BASE_URL from '../constants/baseUrl';

// Function to fetch items from the backend using Axios
async function  fetchItems() {
    return axios.get(`${BASE_URL}/items`)
        .then((res) => {
            const items = res.data;
            return items;
        })
        .catch((err) => {
            throw err;
        });
}

// Export the function for use in other files
export { fetchItems };
