import axios from 'axios';

const API_URL = 'https://dummyjson.com';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTasksAPI = async (token: string): Promise<Task[]> => {
  
  const response = await axios.get(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data.todos;
};
