import BASE_URL from '../../constants/baseUrl';
import axios from 'axios';

// Upload or update collateral for the current user
async function uploadOrUpdateCollateral(collateralData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/collaterals`, collateralData);
    return response.data;
  } catch (error) {
    console.error('Error uploading/updating collateral:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error saving collateral' };
  }
}

// Get current user's collateral
async function getMyCollateral() {
  try {
    const response = await axios.get(`${BASE_URL}/api/collaterals/mine`);
    return response.data;
  } catch (error) {
    console.error('Error fetching collateral:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      return null; // Return null if no collateral is found, as per backend logic
    }
    throw error.response?.data || { message: 'Error fetching collateral' };
  }
}

// Check if user meets collateral minimum requirement
async function checkCollateralMinimum(minimumValue) {
  try {
    const response = await axios.post(`${BASE_URL}/api/collaterals/check`, { minimumValue });
    return response.data;
  } catch (error) {
    console.error('Error checking collateral minimum:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error checking collateral' };
  }
}

export {
  uploadOrUpdateCollateral,
  getMyCollateral,
  checkCollateralMinimum,
}; 