export interface NewTask {
  date: string;
  title: string;
  isComplete: boolean;
}

export interface TaskFromDB {
  id: string;
  date: string;
  title: string;
  isComplete: boolean;
}

export interface TasksState {
  tasks: TaskFromDB[];
  newTaskTitle: string;
  loading: boolean;
  error: boolean;
}