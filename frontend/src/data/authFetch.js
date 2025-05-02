const authFetch = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5500/api/users/auth', {
            email,
            password
        });

        console.log('Login response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
}

export default authFetch;