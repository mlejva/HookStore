import { createSlice } from '../hookstore';


export interface TodoItem {
  title: string;
  isCompleted: boolean;
}

interface TodoSlice {
  work: TodoItem[];
  personal: TodoItem[];
}

function initialState(): TodoSlice {
  return {
      work: [],
      personal: [],          
  }
}

const todo = createSlice('todo', initialState());
export const selectWorkTodos = todo.createSelector<TodoItem[], TodoItem>(
  slice => slice.work,
  // This is basically a reducer action handler.
  (slice, newWorkTodo) => ({
      ...slice,
      work: [...slice.work, newWorkTodo],
  })
);

// addWorkTodo works here as a reducer dispatch. This dispatch is then handled 
// by the workTodosSelector's setter. As mentioned above, this setter is
// basically an action handler for this dispatch.
// const [workTodos, addWorkTodo] = useStore(workTodosSelector);

// const workTodo: TodoItem = { title: 'Work Todo', isCompleted: false };
// addWorkTodo(workTodo);






// // import { createStore, createSelector, Selector } from 'hookstore';
// import { createStore } from 'hookstore';

// export interface Task {
//   title: string;
//   isCompleted: boolean;
// }

// interface TasksStore {
//   all: Task[];
// }

// const tasks = createStore('tasks', {
//   all: [],
// } as TasksStore);

// export const selectAllTasks = tasks.createSelector<Task[], Task[]>(
//   // Getter
//   tasksStore => tasksStore.all,
//   // Setter
//   (tasksStore, newTasks) => {
//     tasksStore.all = newTasks;
//     // TODO: Ideally, we don't want user to return anything here. Just mutate the object.
//     // return tasksStore;
//   }
// );

// // TODO: Support only getter
// // export const selectCompletedTasks = tasks.createSelector<Task[]>(
// //   tasksStore => tasksStore.all.filter(t => t.isCompleted),
// // )

// export const selectCompletedTasks = tasks.createSelector<Task[], Task[]>(
//   tasksStore => tasksStore.all.filter(t => t.isCompleted),
//   (tasksStore, completedTasks) => {
//     tasksStore.all = tasksStore.all.map(t => ({
//       ...t,
//       isCompleted: completedTasks.includes(t),
//     }));
//   }
// )
