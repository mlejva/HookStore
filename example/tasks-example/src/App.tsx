import React, { useEffect, useState } from 'react';
import { useStore } from '@grobapp/hookstore';
import {
  Task,
  selectTasks,
  selectCompletedTasks,
  selectCategories,
} from './TaskItem/tasks.store';

import TaskItem from './TaskItem';
import TasksCounter from './TasksCounter';

function App() {

  /*
  const [
    [allTasks, addTask],
    [,completeTask],
    [categories]
  ] = useStore(
    selectTasks,
    selectCompletedTasks,
    selectCategories,
  );
  */

  const [allTasks, addTask] = useStore(selectTasks);
  const [,completeTask] = useStore(selectCompletedTasks);
  const [categories] = useStore(selectCategories);

  function handleAddTaskClick() {
    const newTask: Task = {
      id: `${Math.random()}`,
      title: 'Task -' + new Date().toISOString(),
      isCompleted: Math.random() > 0.5,
      category: {id: 'personal', title: 'Personal' },
    };
    addTask(newTask);
  }

  function handleTaskCompleted(t: Task) {
    completeTask(t.id);
  }

  return (
    <div>
      <button
        onClick={handleAddTaskClick}
      >
        Add task
      </button>

      <br/>
      <TasksCounter />
      <br/>

      <br/>
      <h3>Categories</h3>
      {categories.length === 0 && <span>No categories yet</span>}
      {categories.length > 0 &&
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {categories.map(c => (
            <div
              key={c.id}
            >{c.title}
            </div>
          ))}
        </div>
      }
      <br/>

      <h2>All tasks</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {allTasks.map(t => (
          <TaskItem
            key={t.id}
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
