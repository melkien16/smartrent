import { useState, useEffect } from 'react';
import { useHomePageData } from './useHomePageData';

export const useItem = (id) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const { items } = useHomePageData();

    useEffect(() => {
        const foundItem = items.find(item => item._id === id);
        setItem(foundItem);
        setLoading(false);
    }, [id, items]);

    return { item, loading };
}; 