import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useFilters = (initialSearchParams) => {
    const [searchParams, setSearchParams] = useSearchParams(initialSearchParams);
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        sort: searchParams.get('sort') || 'recommended',
        location: searchParams.get('location') || '',
    });

    const filtersApplied = useMemo(
        () =>
            !!(
                filters.search ||
                filters.category ||
                filters.minPrice ||
                filters.maxPrice ||
                filters.sort !== 'recommended' ||
                filters.location
            ),
        [filters]
    );

    const updateFilters = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        const params = new URLSearchParams();
        const updatedFilters = { ...filters, ...newFilters };

        if (updatedFilters.search) params.set('search', updatedFilters.search);
        if (updatedFilters.category) params.set('category', updatedFilters.category);
        if (updatedFilters.minPrice) params.set('minPrice', updatedFilters.minPrice);
        if (updatedFilters.maxPrice) params.set('maxPrice', updatedFilters.maxPrice);
        if (updatedFilters.sort !== 'recommended') params.set('sort', updatedFilters.sort);
        if (updatedFilters.location) params.set('location', updatedFilters.location);

        setSearchParams(params);
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            sort: 'recommended',
            location: '',
        });
        setSearchParams({});
    };

    return { filters, updateFilters, resetFilters, filtersApplied };
}; 