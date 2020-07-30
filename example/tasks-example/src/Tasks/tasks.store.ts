// import { createStore, createSelector, Selector } from 'hookstore';
import { createStore } from 'hookstore';

export interface Task {
  title: string;
  isCompleted: boolean;
}

interface TasksStore {
  all: Task[];
  nested: {
    noUpdate: boolean,
    object: {
      alsoNoUpdate: boolean,
      hello: string,
    }
  }
}

// createStore('tasks', {
//   all: [],
// } as TasksStore);

// export const selectTasks: Selector<Task[], Task[]> = () => [
//   store => store.tasks.all,
//   (store, allTasks) => {
//     store.tasks.all = allTasks;
//     return store;
//   }
// ];

// const selectTasks1 = createSelector<Task[], Task[]>(
//   store => store.tasks.all,
//   (store, tasks) => {
//     return store;
//   }
// );

const tasks = createStore('tasks', {
  all: [],
  nested: {
    noUpdate: true,
    object: {
      alsoNoUpdate: true,
      hello: 'world',
    }
  }
} as TasksStore);

export const selectTasks = tasks.createSelector<TasksStore, Task[]>(
  // Getter
  tasksStore => tasksStore,
  // Setter
  (tasksStore, newTasks) => {
    tasksStore.all = newTasks;
    tasksStore.nested.object.hello = tasksStore.nested.object.hello === 'world' ? 'world!' : 'world';
    return tasksStore;
  }
);

// const [g, s] = useStore(selectTasks);

// export function selectTasks() {
//   return [
//     // (store) => st
//   ]
// }

