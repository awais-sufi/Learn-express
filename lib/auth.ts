import axios from "axios";

const API = "http://localhost:5000/api"; // Change if deployed

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${API}/auth/login`, { email, password });
  return res.data;
};

export const getUserProfile = async (token: string) => {
  const res = await axios.get(`${API}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
