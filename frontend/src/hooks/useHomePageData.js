import { useState, useEffect } from 'react';
import { fetchItems } from '../Fetchers/itemFetcher';
import { fetchWallets } from '../Fetchers/allWallets';

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

        fetchWallets()
            .then((wallets) => {
                console.log('Wallets fetched:', wallets);
            })
            .catch((error) => {
                console.error('Failed to fetch wallets:', error);
            });
    }, []);

    return { items };
}; 