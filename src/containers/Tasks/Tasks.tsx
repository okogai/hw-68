import TaskList from "../../components/TaskList/TaskList.tsx";
import TaskForm from "../../components/TaskForm/TaskForm.tsx";
import React from "react";

const Tasks = () => {
  return (
    <div
      className="container"
      style={{ maxWidth: "1024px", fontFamily: "Roboto, sans-serif" }}
    >
      <h1 className="text-center mb-4 mt-5">To Do List</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Tasks;
