import axios from 'axios';

// The "Base Address" of your server
const API_URL = 'http://localhost:5000/api/auth/';

// 1. LOGIN
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'login', { email, password });
        
        // If successful, save the token so the user stays logged in
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userRole', response.data.user.role);
        }
        
        return response.data;
    } catch (error) {
        // We grab the specific error message from your Backend
        const errorMsg = error.response?.data?.message || 'Login failed';
        throw new Error(errorMsg);
    }
}

// 2. REGISTER
export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(API_URL + 'register', { username, email, password });
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Registration failed';
        throw new Error(errorMsg);
    }
}

// 3. LOGOUT
export const logout = () => {
    // Empty the "pockets" (Local Storage)
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    
    // Redirecting the user or refreshing the page is usually done in the Component
    return { message: 'User logged out successfully' };
}


export const loginResidentUser = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'loginResident', { email, password });
        // If successful, save the token so the user stays logged in
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userRole', response.data.user.role);
        }
        return response.data;
    } catch (error) {
        // We grab the specific error message from your Backend
        const errorMsg = error.response?.data?.message || 'Login failed';
        throw new Error(errorMsg);
    }  
}
export const logoutResident = () => {
    // Empty the "pockets" (Local Storage)
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    // Redirecting the user or refreshing the page is usually done in the Component
    return { message: 'Resident user logged out successfully' };
}

export const registerResidentUser = async (username, email, password) => {
    try {
        const response = await axios.post(API_URL + 'registerResident', { username, email, password }); 
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Resident registration failed';
        throw new Error(errorMsg);
    }
}



export const loginBarangayUser = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'loginBarangay', { email, password });
        // If successful, save the token so the user stays logged in
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userRole', response.data.user.role);
        }
        return response.data;
    } catch (error) {
        // We grab the specific error message from your Backend
        const errorMsg = error.response?.data?.message || 'Login failed';
        throw new Error(errorMsg);
    }   
}
export const logoutBarangay = () => {
    // Empty the "pockets" (Local Storage)
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    // Redirecting the user or refreshing the page is usually done in the Component
    return { message: 'Barangay user logged out successfully' };
}

export const registerBarangayUser = async (username, email, password) => {
    try {
        const response = await axios.post(API_URL + 'registerBarangay', { username, email, password });
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Barangay registration failed';
        throw new Error(errorMsg);
    }
}



