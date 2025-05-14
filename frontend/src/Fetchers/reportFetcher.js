import BASE_URL from "../../constants/baseUrl";
import axios from "axios";

// Create a new report
async function createReport(reportData) {
  try {
    const response = await axios.post(`${BASE_URL}/reports`, reportData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error creating report" };
  }
}

// Get all reports (admin only)
async function getAllReports() {
  try {
    const response = await axios.get(`${BASE_URL}/reports`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching reports" };
  }
}

// Get reports for current user
async function getUserReports() {
  try {
    const userId = JSON.parse(localStorage.getItem("smartRentUser"))?._id;
    const response = await axios.get(`${BASE_URL}/reports/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching user reports" };
  }
}

// Get specific report by ID
async function getReportById(reportId) {
  try {
    const response = await axios.get(`${BASE_URL}/reports/${reportId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching report" };
  }
}

// Update report status (admin only)
async function updateReportStatus(reportId, status) {
  try {
    const response = await axios.put(`${BASE_URL}/reports/${reportId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error updating report status" };
  }
}

// Delete report (admin only)
async function deleteReport(reportId) {
  try {
    const response = await axios.delete(`${BASE_URL}/reports/${reportId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error deleting report" };
  }
}

export {
  createReport,
  getAllReports,
  getUserReports,
  getReportById,
  updateReportStatus,
  deleteReport,
}; 