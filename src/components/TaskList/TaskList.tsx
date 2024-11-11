import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store.ts";
import { useEffect } from "react";
import {
  deleteTask,
  fetchTasks,
  setTaskStatus,
} from "../../slices/taskSlice.ts";
import TaskItem from "../TaskItem/TaskItem.tsx";
import Spinner from "../UI/Spinner/Spinner.tsx";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);

  const handleDelete = async (id: string) => {
    await dispatch(deleteTask(id));
    dispatch(fetchTasks());
  };

  const handleSetTaskStatus = async (id: string) => {
    await dispatch(setTaskStatus(id));
    dispatch(fetchTasks());
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="container-md">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onSetTaskStatus={handleSetTaskStatus}
          />
        ))
      ) : (
        <h4 className="text-center">No tasks added yet</h4>
      )}
    </div>
  );
};

export default TaskList;
