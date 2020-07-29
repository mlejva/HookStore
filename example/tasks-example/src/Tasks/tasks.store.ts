import { createStore, Selector } from 'hookstore';

interface Task {
  title: string;
  isCompleted: boolean;
}

interface TasksStore {
  all: Task[];
}

createStore('tasks', {
  all: [],
} as TasksStore);

export const selectTasks: Selector<Task[], Task[]> = () => [
  store => store.tasks.all,
  (store, allTasks) => {
    store.tasks.all = allTasks;
    return store;
  }
];

// export function selectTasks() {
//   return [
//     // (store) => st
//   ]
// }

