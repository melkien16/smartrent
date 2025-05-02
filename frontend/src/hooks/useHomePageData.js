import { useState, useEffect } from 'react';
import { fetchItems } from '../Fetchers/itemFetcher';

export const useHomePageData = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems()
            .then((fetchedItems) => {
                setItems(fetchedItems);
                console.log('Items saved to state:', fetchedItems);
            })
            .catch((error) => {
                console.error('Failed to fetch items:', error);
            });
    }, []);

    return { items };
}; 