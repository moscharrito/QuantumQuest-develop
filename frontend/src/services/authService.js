import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'https://singhit-api.onrender.com/auth/users';

export const login = async (data) => {
  try {
    console.log('Sending Login Request:', { username: data.email, password: data.password });

    const requestData = qs.stringify({
      username: data.email,
      password: data.password,
    });

    const response = await axios.post(
      `${API_BASE_URL}/login`,
      requestData,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    const { access_token, token_type } = response.data;
    if (!access_token || !token_type) {
      throw new Error('Invalid token response from server');
    }

    const bearerToken = `${token_type} ${access_token}`;
    localStorage.setItem('authToken', bearerToken);
    return { success: true, token: bearerToken };
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);

    return {
      success: false,
      error: error.response?.data?.detail || 'Invalid credentials. Please try again.',
    };
  }
};

export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.detail || 'Registration failed. Please try again.'
    };
  }
};

export const verifyAccount = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify`, { token });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Verification Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.detail || 'Verification Link Expired, Try Signing up again'
    };
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, {
      email: data.email
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.detail || 'Password reset request failed. Please try again.'
    };
  }
};


export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset-password`, {
      token: data.token,
      new_password: data.new_password,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Reset Password Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.detail || 'Password reset failed. Please try again.',
    };
  }
};