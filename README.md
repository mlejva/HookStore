# What is HookStore?
HookStore is an opinionated framework for global state management in your React app. It's based on React Hooks and a reducer concept.

### When should I use it?
Usually, you can avoid using global state in a React app with a clever design. Sometimes though, global state might make things easier or you don't really have a choice.
That's when HookStore comes into play. The goal of HookStore is to give you an easy and fast way for global state management.

### There are already frameworks like Redux. Why should I use HookStore instead?
Redux and other popular frameworks are battle-tested and have proved many times that they are capable of handling complex global states of huge React apps. But sometimes using Redux feels like bringing a nuke to an argument with your neighbor. HookStore is aimed for exactly these situations. You probably won't use it with monstrose React app but it might be just what you need for your small to medium sized React app. You can look at HookStore as a poor Redux cousin.

HookStore is an opinionated framework and was developed with the following ideas in mind:
- You shouldn't need to spend multiple days reading docs before you are able to use HookStore.
- You are using functional components and hooks in your React app.
- The definition of a global state and operations on it should be in the same place for better reasoning and faster navigation.
- It should be straightforward to understand how your global state works.
- You should write only the minimal required code.


# Installation

#### npm
```sh
npm install @grobapp/hookstore
```

#### yarn
```sh
yarn add @grobapp/hookstore
```

# Usage
The main concept of HookStore is a selector. Selector is a pair of getter and setter. It describes how you retrieve and save data in the global state.


Let's say we are building a todo app. We want to keep our tasks in the global state. This is how you'd achieve that with HookStore.

1. Create a separate `task.store.ts` file.
2. Define types for the `Task` item and for a slice of the global state. The slice describes everything we need for our tasks.

```typescript
// Inside the task.store.ts file
import { createSlice } from '@grobapp/hookstore';

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

// Our slice is fairly simple for now.
interface TasksSlice {
  tasks: Task[];
}

function initialTasksState(): TasksSlice {
  return {
    tasks: [],
  };
}

// Here we tell HookStore to create a slice of the global state that describes our tasks.
// The first parameter is a name of the slice and the second parameter is the initial state of the slice.
const tasks = createSlice('tasks', initialTasksState());
```

3. Define selectors.

```typescript
// Inside the task.store.ts file

// Previous code
...

const tasks = createSlice('tasks', initialTasksState());

// This a selector.
// It has two functions as parameters - getter and setter.
// Getter describes how to retrieve data from the slice.
// Seter describes how to add new data to the slice.
export const selectTasks = tasks.createSelector<Task[], Task>(
  // Getter.
  slice => slice.tasks,
  // Setter.
  (slice, newTask) => ({
    ...slice,
    tasks: [...slice.tasks, newTask],
  })
);
```

4. Access global state in the component.

```tsx
// Inside the Tasks.tsx file
import { useStore } from '@grobapp/hookstore';
import { selectTasks, Task } from './tasks.store';

function Tasks() {
  // Here we pass the imported selector to the HookStore's hook.
  // It returns slightly adjusted version of the getter and the setter we defined earlier.
  const [allTasks, addNewTask] = useStore(selectTasks);

  function handleButtonClick() {
    const newTask: Task = {
      id: `${Math.random()}`,
      title: 'Task -' + new Date().toISOString(),
      isCompleted: Math.random() > 0.5,
    };
    // Here we're using the getter to add a new task to the global state.
    addNewTask(newTask);
  }

  return (
    <div>
      <button onClick={handleButtonClick}>Add task</button>

      <h2>All tasks</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {allTasks.map(t => (
          <div key={t.id}>
            {t.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
```



