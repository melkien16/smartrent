import BASE_URL from "../../constants/baseUrl";
import axios from "axios";

// Function to fetch bookings by user ID
async function fetchBookingsByUser() {
  try {
    const userId = JSON.parse(localStorage.getItem("smartRentUser"))?._id;
    const response = await axios.get(`${BASE_URL}/bookings/user/${userId}`);
    console.log(`Fetched ${response.data.length} bookings for user ${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings by user:", error);
    throw error;
  }
}

// Function to fetch bookings for items owned by the logged-in owner
async function getBookingsForOwner() {
  try {
    const response = await axios.get(`${BASE_URL}/bookings/owner`);
    console.log(`Fetched ${response.data.length} bookings for owned items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching owner bookings:", error);
    throw error.response?.data || { message: "Error fetching owner bookings" };
  }
}

// Send a new message
async function sendMessage(receiverId, message) {
  try {
    const response = await axios.post(`${BASE_URL}/messages`, {
      receiver: receiverId,
      message,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error sending message" };
  }
}

// Get all messages for the current user
async function getAllMessages() {
  try {
    const response = await axios.get(`${BASE_URL}/messages`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching messages" };
  }
}

// Get messages between two users
async function getMessages(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/messages/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching messages" };
  }
}

// Mark a message as read
async function markMessageAsRead(messageId) {
  try {
    const response = await axios.put(`${BASE_URL}/messages/${messageId}/read`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error marking message as read" };
  }
}

// Export the functions for use in other files
export { 
  fetchBookingsByUser, 
  getBookingsForOwner,
  sendMessage, 
  getMessages, 
  markMessageAsRead, 
  getAllMessages 
};
