import dayjs from "dayjs";
import { TaskFromDB } from "../../types";
import React from "react";

interface Props {
  task: TaskFromDB;
  onDelete: (id: string) => void;
  onSetTaskStatus: (id: string) => void;
}

const TaskItem: React.FC<Props> = ({ task, onDelete, onSetTaskStatus }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex align-items-center">
        <div>
          <input
            type="checkbox"
            checked={task.isComplete}
            onChange={() => onSetTaskStatus(task.id)}
            className="me-3"
          />
        </div>
        <div className="flex-grow-1 ms-4">
          <small className="d-block text-muted">
            <strong className="me-2">Created on:</strong>
            {dayjs(task.date).format("DD/MM/YYYY HH:mm")}
          </small>
          <span>{task.title}</span>
        </div>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
