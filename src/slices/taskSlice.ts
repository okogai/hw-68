import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosAPI from "../axiosAPI.ts";
import { NewTask, TaskFromDB, TasksState } from "../types";
import { RootState } from "../app/store.ts";

const initialState: TasksState = {
  tasks: [],
  newTaskTitle: "",
  loading: false,
  error: false,
  taskLoading: {},
};

export const addTask = createAsyncThunk<void, NewTask>(
  "tasks/addTask",
  async (newTask) => {
    await axiosAPI.post("/tasks.json", newTask);
  },
);

export const fetchTasks = createAsyncThunk<TaskFromDB[]>(
  "tasks/fetchTasks",
  async () => {
    const response = await axiosAPI("/tasks.json");
    if (response.data) {
      const tasksArray: TaskFromDB[] = Object.keys(response.data).map(
        (key) => ({
          id: key,
          ...response.data[key],
        }),
      );

      return tasksArray;
    } else {
      return [];
    }
  },
);

export const deleteTask = createAsyncThunk<void, string>(
  "tasks/deleteTask",
  async (taskId) => {
    await axiosAPI.delete(`/tasks/${taskId}.json`);
  },
);

export const setTaskStatus = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("tasks/setTaskComplete", async (taskId, thunkAPI) => {
  const taskToComplete = thunkAPI
    .getState()
    .tasks.tasks.find((task) => task.id === taskId);
  if (taskToComplete) {
    const updatedTask = {
      ...taskToComplete,
      isComplete: !taskToComplete.isComplete,
    };
    await axiosAPI.put(`/tasks/${taskId}.json`, updatedTask);
  }
});

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setNewTaskTitle: (state, action: PayloadAction<string>) => {
      state.newTaskTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTask.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<TaskFromDB[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        },
      )
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(setTaskStatus.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(setTaskStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setTaskStatus.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setNewTaskTitle } = taskSlice.actions;
export const TaskReducer = taskSlice.reducer;
