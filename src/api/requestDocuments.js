import axios from "axios";


const API_URL = 'http://localhost:5000/api/requestDocuments/';

// 1. GET ALL REQUESTS
export const getAllRequests = async () => {
    try {
        const response = await axios.get(API_URL + 'requests');
        return response.data.requests;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch requests';
        throw new Error(errorMsg);
    }
}

export const getRequestById = async (requestId) => {
    try {
        const response = await axios.get(API_URL + `requests/${requestId}`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch request';
        throw new Error(errorMsg);
    }
}

export const addRequest = async (requestData) => {
    try {
        const response = await axios.post(API_URL + 'requests', requestData);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to add request';
        throw new Error(errorMsg);
    }
}


export const updateRequest = async (requestId, requestData) => {
    try {
        const response = await axios.put(API_URL + `requests/${requestId}`, requestData);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to update request';
        throw new Error(errorMsg);
    }
}

