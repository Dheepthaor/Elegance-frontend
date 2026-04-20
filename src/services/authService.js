import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
export const loginUser = async (loginData) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    loginData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return response.data;
};