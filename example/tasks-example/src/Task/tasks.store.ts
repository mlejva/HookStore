// import { createStore, createSelector, Selector } from 'hookstore';
import { createStore } from 'hookstore';

export interface Task {
  title: string;
  isCompleted: boolean;
}

interface TasksStore {
  all: Task[];
}

const tasks = createStore('tasks', {
  all: [],
} as TasksStore);

export const selectAllTasks = tasks.createSelector<Task[], Task[]>(
  // Getter
  tasksStore => tasksStore.all,
  // Setter
  (tasksStore, newTasks) => {
    tasksStore.all = newTasks;
    // TODO: Ideally, we don't want user to return anything here. Just mutate the object.
    // return tasksStore;
  }
);

// TODO: Support only getter
// export const selectCompletedTasks = tasks.createSelector<Task[]>(
//   tasksStore => tasksStore.all.filter(t => t.isCompleted),
// )

export const selectCompletedTasks = tasks.createSelector<Task[], Task[]>(
  tasksStore => tasksStore.all.filter(t => t.isCompleted),
  (tasksStore, completedTasks) => {
    tasksStore.all = tasksStore.all.map(t => ({
      ...t,
      isCompleted: completedTasks.includes(t),
    }));
  }
)
