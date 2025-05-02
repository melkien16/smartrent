import axios from 'axios';
import BASE_URL from "../../constants/baseUrl";

const API_URL = `${BASE_URL}/wallets`;

const userId = JSON.parse(localStorage.getItem('smartRentUser'))?._id;

// Get wallet by user ID
export const getWalletByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching wallet:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Error fetching wallet' };
    }
};

// Create a new wallet
export const createWallet = async () => {
    try {
        const response = await axios.post(API_URL, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating wallet:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Error creating wallet' };
    }
};

// Credit wallet
export const creditWallet = async (amount) => {
    try {
        console.log('Crediting wallet:', { userId, amount, API_URL });
        const response = await axios.put(`${API_URL}/${userId}/credit`, { amount, description: 'Deposit' }, {
            withCredentials: true,
        });
        console.log('Credit response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error crediting wallet:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Error crediting wallet' };
    }
};

// Debit wallet
export const debitWallet = async (amount) => {
    try {
        console.log('Debiting wallet:', { userId, amount, API_URL });
        const response = await axios.put(`${API_URL}/${userId}/debit`, { amount, description: 'Withdraw' }, {
            withCredentials: true,
        });
        console.log('Debit response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error debiting wallet:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Error debiting wallet' };
    }
};

// Get all wallets (Admin only)
export const getAllWallets = async () => {
    try {
        const response = await axios.get(API_URL, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all wallets:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Error fetching all wallets' };
    }
}; 