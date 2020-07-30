import React, { useEffect, useState } from 'react';

import { useStore } from 'hookstore';
import { Task as TaskType, selectAllTasks, selectCompletedTasks } from './Task/tasks.store';

import Task from './Task';
import TasksCounter from './TasksCounter';

function App() {
  const [tasks, setTasks] = useStore(selectAllTasks);
  const [completedTasks, setCompletedTasks] = useStore(selectCompletedTasks);

  useEffect(() => {
    console.log('Tasks', tasks);
  }, [tasks]);

  function addTask() {
    const newTask = {
      title: 'Task -' + new Date().toISOString(),
      isCompleted: Math.random() > 0.5,
    };
    setTasks((current) => current.concat(newTask));
  }

  function handleTaskCompleted(t: TaskType) {
    setCompletedTasks(current => current.concat(t));
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


      <h2>All tasks</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tasks.map(t => (
          <Task
            key={t.title}
            task={t}
            onTaskCompleted={handleTaskCompleted}
          />
        ))}
      </div>

      {/* <h2>Completed tasks</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {completedTasks.map(t => (
          <div
            key={t.title}
          >
            {t.title}
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default App;
