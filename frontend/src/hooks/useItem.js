import { useState, useEffect } from 'react';
import axios from 'axios';

export const useItem = (id) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/items/${id}`);
                setItem(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setItem(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id]);

    return { item, loading, error };
}; 