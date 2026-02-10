import axios from "axios";

const API_URL = 'http://localhost:5000/api/resident/';

// Get resident by user ID
export const getResidentByUserId = async (userId) => {
    try {
        const response = await axios.get(API_URL + `user/${userId}`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch resident data';
        throw new Error(errorMsg);
    }
}

// Get all residents
export const getAllResidents = async () => {
    try {
        const response = await axios.get(API_URL + 'users');
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch residents';
        throw new Error(errorMsg);
    }
}

// Get resident by ID
export const getResidentById = async (residentId) => {
    try {
        const response = await axios.get(API_URL + residentId);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch resident';
        throw new Error(errorMsg);
    }
}

// Create resident
export const createResident = async (residentData) => {
    try {
        const response = await axios.post(API_URL, residentData);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to create resident';
        throw new Error(errorMsg);
    }
}

// Update resident
export const updateResident = async (residentId, residentData) => {
    try {
        const response = await axios.put(API_URL + residentId, residentData);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to update resident';
        throw new Error(errorMsg);
    }
}

// Delete resident
export const deleteResident = async (residentId) => {
    try {
        const response = await axios.delete(API_URL + `users/${residentId}`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to delete resident';
        throw new Error(errorMsg);
    }
}
