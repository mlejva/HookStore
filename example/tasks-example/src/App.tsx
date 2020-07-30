import React, { useEffect } from 'react';

import { useStore } from 'hookstore';
import { selectTasks } from './Tasks/tasks.store';

import TasksCounter from './TasksCounter';

function App() {
  const [tasks, setTasks] = useStore(selectTasks);

  useEffect(() => {
    console.log('Tasks', tasks);
  }, [tasks]);

  function addTask() {
    const newTask = {
      title: 'Task 1',
      isCompleted: false,
    };
    const allTasks = tasks.all.concat([newTask]);
    setTasks(allTasks);
  }

  return (
    <div>
      App

      <button
        onClick={addTask}
      >
        Add task
      </button>

      <TasksCounter />
    </div>
  );
}

export default App;
