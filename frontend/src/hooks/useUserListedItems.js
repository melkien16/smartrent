import { useState, useEffect } from 'react';
import { fetchItemsByOwner } from '../Fetchers/itemFetcher';

export const useUserListedItems = () => {
    const [userListedItems, setUserListedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await fetchItemsByOwner();
                setUserListedItems(items);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return { userListedItems, loading, error };
}; 