import axios from "axios";
import BASE_URL from "../../constants/baseUrl";

const API_URL = `${BASE_URL}/collaterals`;

// Get collateral by user ID
export const getCollateralByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/mine`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching collateral" };
  }
};

// Create new collateral
export const createCollateral = async (collateralData) => {
  try {
    const response = await axios.post(API_URL, collateralData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error creating collateral" };
  }
};

// Update collateral
export const updateCollateral = async (userId, collateralData) => {
  try {
    const response = await axios.put(`${API_URL}/mine`, collateralData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error updating collateral" };
  }
};

// Delete collateral
export const deleteCollateral = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/mine`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error deleting collateral" };
  }
};

// Upload collateral document
export const uploadCollateralDocument = async (userId, formData) => {
  try {
    const response = await axios.post(`${API_URL}/mine/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error uploading document" };
  }
};

// Remove collateral document
export const removeCollateralDocument = async (userId, documentId) => {
  try {
    const response = await axios.delete(`${API_URL}/mine/documents/${documentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error removing document" };
  }
};

// Get all collaterals (Admin only)
export const getAllCollaterals = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching all collaterals" };
  }
};

// Verify collateral (Admin only)
export const verifyCollateral = async (userId, verificationData) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/verify`, verificationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error verifying collateral" };
  }
};

// Validate collateral value against rental requirements
export const validateCollateralValue = async (userId, rentalValue) => {
  try {
    const response = await axios.post(`${API_URL}/mine/validate`, { rentalValue });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error validating collateral value" };
  }
}; 