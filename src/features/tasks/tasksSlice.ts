import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasksAPI } from './tasksAPI';
import { RootState } from '../../app/store';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { state: RootState; rejectValue: string }
>(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    if (!token) {
      return rejectWithValue('Отсутствует токен авторизации');
    }
    try {
      const response = await fetchTasksAPI(token);
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('Произошла неизвестная ошибка');
      }
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      }
    );
    builder.addCase(
      fetchTasks.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка получения задач';
      }
    );
  },
});

export default tasksSlice.reducer;
