import { useMemo } from 'react';
import { mockItems } from '../data/mockItems';

export const useFilteredItems = (filters) => {
    return useMemo(() => {
        const allItems = [...mockItems.featured, ...mockItems.recent];

        const filteredItems = allItems.filter((item) => {
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
                filteredItems.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredItems.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredItems.sort((a, b) => {
                    if (mockItems.recent.find((item) => item.id === a.id)) return -1;
                    if (mockItems.recent.find((item) => item.id === b.id)) return 1;
                    return 0;
                });
                break;
            case 'rating':
                filteredItems.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        return filteredItems;
    }, [filters]);
}; 