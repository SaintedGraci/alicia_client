import axios from "axios";

// The "Base Address" of your server
const API_URL = 'http://localhost:5000/api/barangay/';

// 1. GET ALL BARANGAYS
export const getAllBarangays = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch barangays';
        throw new Error(errorMsg);
    }
}

// 2. GET ALL USERS
export const getAllUsers = async () => {
    try {
        const response = await axios.get(API_URL + 'users');
        return response.data.users;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch users';
        throw new Error(errorMsg);
    }
}

// 3. DELETE A USER BY ID
export const deleteUserById = async (userId) => {
    try {
        const response = await axios.delete(API_URL + `users/${userId}`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to delete user';
        throw new Error(errorMsg);
    }
}

// 4. ADD A NEW USER
export const addUser = async (username, email, password, role) => {
    try {
        const response = await axios.post(API_URL + 'users', { username, email, password, role });
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to add user';
        throw new Error(errorMsg);
    }
}



