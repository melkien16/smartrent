import { useState, useEffect } from 'react';
import { getAllUsers } from '../Fetchers/getAllUsers';
import { fetchItems } from '../Fetchers/itemFetcher';

export const useAdminData = (activeTab) => {
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState(new Set());

    useEffect(() => {
        const fetchUsers = async () => {
            if (activeTab === 'users') {
                setLoading(true);
                setError(null);
                try {
                    const fetchedUsers = await getAllUsers();
                    setUsers(fetchedUsers);
                } catch (err) {
                    setError('Failed to fetch users');
                    console.error('Error fetching users:', err);
                } finally {
                    setLoading(false);
                }
            }
        };

        const fetchItemsData = async () => {
            if (activeTab === 'items') {
                setLoading(true);
                setError(null);
                try {
                    const fetchedItems = await fetchItems();
                    setItems(fetchedItems);
                } catch (err) {
                    setError('Failed to fetch items');
                    console.error('Error fetching items:', err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUsers();
        fetchItemsData();
    }, [activeTab]);

    const handleItemSelect = (itemId) => {
        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(itemId)) {
            newSelectedItems.delete(itemId);
        } else {
            newSelectedItems.add(itemId);
        }
        setSelectedItems(newSelectedItems);
    };

    const handleDeleteSelected = () => {
        console.log('Deleting items:', Array.from(selectedItems));
        setSelectedItems(new Set());
    };

    return {
        users,
        setUsers,
        items,
        setItems,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedItems,
        handleItemSelect,
        handleDeleteSelected
    };
}; 