import axios from "axios";

// The "Base Address" of your server
const API_URL = 'http://localhost:5000/api/document-types/';

// 1. GET ALL DOCUMENT TYPES
export const getAllDocumentTypes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch document types';
        throw new Error(errorMsg);
    }
}

// 2. GET DOCUMENT TYPES BY TYPE (barangay or municipal)
export const getDocumentTypesByType = async (type) => {
    try {
        const response = await axios.get(API_URL + type);
        return response.data.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch document types';
        throw new Error(errorMsg);
    }
}

// 3. GET BARANGAY DOCUMENT TYPES
export const getBarangayDocumentTypes = async () => {
    try {
        const response = await axios.get(API_URL + 'barangay');
        return response.data.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch barangay document types';
        throw new Error(errorMsg);
    }
}

// 4. GET MUNICIPAL DOCUMENT TYPES
export const getMunicipalDocumentTypes = async () => {
    try {
        const response = await axios.get(API_URL + 'municipal');
        return response.data.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch municipal document types';
        throw new Error(errorMsg);
    }
}

// 5. GET DOCUMENT TYPE BY ID
export const getDocumentTypeById = async (documentTypeId) => {
    try {
        const response = await axios.get(API_URL + documentTypeId);
        return response.data.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch document type';
        throw new Error(errorMsg);
    }
}

// 6. CREATE DOCUMENT TYPE (admin only)
export const createDocumentType = async (documentTypeData) => {
    try {
        const response = await axios.post(API_URL, documentTypeData);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to create document type';
        throw new Error(errorMsg);
    }
}

// 7. UPDATE DOCUMENT TYPE
export const updateDocumentType = async (documentTypeId, documentTypeData) => {
    try {
        const response = await axios.put(API_URL + documentTypeId, documentTypeData);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to update document type';
        throw new Error(errorMsg);
    }
}

// 8. DEACTIVATE DOCUMENT TYPE
export const deactivateDocumentType = async (documentTypeId) => {
    try {
        const response = await axios.delete(API_URL + documentTypeId);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to deactivate document type';
        throw new Error(errorMsg);
    }
}