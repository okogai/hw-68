import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import {
  fetchTasks,
  addTask,
  setNewTaskTitle,
} from "../../slices/taskSlice.ts";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner.tsx";

const TaskForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newTaskTitle, loading } = useSelector(
    (state: RootState) => state.tasks,
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newTaskTitle.trim()) {
      const newTask = {
        title: newTaskTitle,
        date: new Date().toISOString(),
        isComplete: false,
      };
      await dispatch(addTask(newTask));
      dispatch(fetchTasks());
      dispatch(setNewTaskTitle(""));
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewTaskTitle(e.target.value));
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleAddTask} className="mb-4">
        <div className="mb-3">
          <label htmlFor="newTaskTitle" className="form-label">
            Add a new task
          </label>
          <input
            type="text"
            id="newTaskTitle"
            className="form-control"
            placeholder="Enter task title"
            value={newTaskTitle}
            onChange={handleTitleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task {loading && <ButtonSpinner />}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
