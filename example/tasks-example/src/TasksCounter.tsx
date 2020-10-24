import React, { useEffect } from 'react';
import { useStore } from '@grobapp/hookstore';
import { selectTasks, selectCompletedTasks } from './TaskItem/tasks.store';

function TasksCounter() {
  const [tasks] = useStore(selectTasks);
  const [completedTasks] = useStore(selectCompletedTasks);

  return (
    <>
      <span>
        Total tasks: {tasks.length}
      </span>
      <br/>
      <span>
        Completed tasks: {completedTasks.length}
      </span>
    </>
  );
}

export default TasksCounter;

