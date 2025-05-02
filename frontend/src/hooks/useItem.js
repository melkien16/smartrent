import { useState, useEffect } from 'react';
import { mockItems } from '../data/mockItems';

export const useItem = (id) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Find item in mockItems
        const foundItem = [...mockItems.featured, ...mockItems.recent].find(item => item.id === id);
        setItem(foundItem);
        setLoading(false);
    }, [id]);

    return { item, loading };
}; 