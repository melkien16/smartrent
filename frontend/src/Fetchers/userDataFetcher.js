import axios from 'axios';
import BASE_URL from "../../constants/baseUrl";

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error(error.response?.data?.message || 'Failed to register user');
    }
};

// Login user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/auth`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error(error.response?.data?.message || 'Failed to login');
    }
};

// Logout user
export const logoutUser = async (token) => {
    try {
        await axios.post(`${BASE_URL}/users/logout`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error logging out:', error);
        throw new Error(error.response?.data?.message || 'Failed to logout');
    }
};

// Get user profile
export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/profile`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
};

// Update user profile
export const updateUserProfile = async (userData, token) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/profile`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw new Error(error.response?.data?.message || 'Failed to update user profile');
    }
};

// Get user by ID (admin only)
export const getUserById = async (userId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
};

// Get all users (admin only)
export const getAllUsers = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
};

// Update user (admin only)
export const updateUser = async (userId, userData, token) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(error.response?.data?.message || 'Failed to update user');
    }
};

// Delete user (admin only)
export const deleteUser = async (userId, token) => {
    try {
        await axios.delete(`${BASE_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
}; 