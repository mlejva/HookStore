import React, { useEffect, useState } from 'react';
import { useStore } from './hookstore';
import { TodoItem, selectWorkTodos } from './Task/tasks.store';

// import { useStore } from 'hookstore';
// import { Task as TaskType, selectAllTasks, selectCompletedTasks } from './Task/tasks.store';

import Task from './Task';
import TasksCounter from './TasksCounter';

function App() {
  const [workTasks, addWorkTask] = useStore(selectWorkTodos);

  // const [tasks, setTasks] = useStore(selectAllTasks);
  // const [completedTasks, setCompletedTasks] = useStore(selectCompletedTasks);

  // useEffect(() => {
  //   console.log('Tasks', tasks);
  // }, [tasks]);

  function addTask() {
    const newTask: TodoItem = {
      title: 'Task -' + new Date().toISOString(),
      isCompleted: Math.random() > 0.5,
    };
    addWorkTask(newTask);
    console.log('Added new task');
    // setTasks((current) => current.concat(newTask));
  }

  function handleTaskCompleted(t: TodoItem) {
    // setCompletedTasks(current => current.concat(t));
  }

  return (
    <div>
      App

      <button
        onClick={addTask}
      >
        Add task
      </button>

      {/* <TasksCounter /> */}


      <h2>All tasks</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {workTasks.map(t => (
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
