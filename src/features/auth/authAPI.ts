import axios from 'axios';

const API_URL = 'https://dummyjson.com';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  name: string;
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  name: string;
  token: string;
}

export const registerAPI = async (userData: RegisterData): Promise<RegisterResponse> => {
  
  const response = await axios.post(`${API_URL}/users/add`, {
    firstName: userData.name,
    email: userData.email,
    password: userData.password,
  });
  
  return {
    id: response.data.id.toString(),
    name: response.data.firstName,
    token: 'dummy-token', 
  };
};

export const loginAPI = async (credentials: LoginData): Promise<LoginResponse> => {
  
  const response = await axios.post(`${API_URL}/auth/login`, {
    username: credentials.email, 
    password: credentials.password,
  });
  return {
    id: response.data.id.toString(),
    name: response.data.username,
    token: response.data.token, 
  };
};
