import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";  // Replace with your FastAPI server URL

axios.defaults.withCredentials = true;

export const createUser = async (user) => {
  const response = await axios.post(`${API_URL}/users/`, user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users/`);
  return response.data;
};

export const getUser = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const getIncompleteUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/incomplete-users-setup`);
    return response.data;
  } catch (error) {
    console.error('Error fetching incomplete users:', error);
    return [];
  }
};