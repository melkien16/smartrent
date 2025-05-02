import { useMemo, useState, useEffect } from 'react';
import { fetchItems } from '../Fetchers/itemFetcher';

export const useFilteredItems = (filters) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                setLoading(true);
                const fetchedItems = await fetchItems();
                setItems(fetchedItems);
            } catch (err) {
                setError(err);
                console.error('Error loading items:', err);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

    const filteredItems = useMemo(() => {
        if (loading) return [];
        if (error) return [];

        const filtered = items.filter((item) => {
            const matchesSearch =
                item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                item.description.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCategory = !filters.category || item.category === filters.category;

            const minPriceValue = filters.minPrice ? parseFloat(filters.minPrice) : 0;
            const maxPriceValue = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
            const matchesPrice = item.price >= minPriceValue && item.price <= maxPriceValue;

            const matchesLocation = !filters.location ||
                item.location.toLowerCase().includes(filters.location.toLowerCase());

            return matchesSearch && matchesCategory && matchesPrice && matchesLocation;
        });

        switch (filters.sort) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        return filtered;
    }, [filters, items, loading, error]);

    return {
        items: filteredItems,
        loading,
        error
    };
}; 