import { createSlice } from '@grobapp/hookstore';

export interface Category {
  id: string;
  title: string;
}

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  category: Category | undefined;
}

interface TasksSlice {
  tasks: Task[];
}

function initialTasksState(): TasksSlice {
  return {
    tasks: [],
  };
}

const tasks = createSlice('tasks', initialTasksState());

export const selectTasks = tasks.createSelector<Task[], Task>(
  slice => slice.tasks,
  (slice, newTask) => ({
    ...slice,
    tasks: [...slice.tasks, newTask],
  })
);

export const selectCompletedTasks = tasks.createSelector<Task[], string>(
  slice => slice.tasks.filter(t => t.isCompleted),
  (slice, completedTaskID) => ({
    ...slice,
    tasks: slice.tasks.map(t => t.id === completedTaskID ? {...t, isCompleted: true} as Task : t),
  })
);

export const selectCategories = tasks.createSelector<Category[]>(
  slice => {
    const cs: Category[] = [];
    slice.tasks.forEach(t => {
      if (t.category && cs.findIndex(c => c.id === t.category?.id) === -1) {
        cs.push(t.category);
      }
    });
    return cs;
  },
);

