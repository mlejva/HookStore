import React, { useEffect } from 'react';
// import { useStore } from 'hookstore';
import { selectAllTodos } from './Task/tasks.store';
import { useStore } from './hookstore';

function TasksCounter() {
  const [tasks] = useStore(selectAllTodos);

  useEffect(() => {
    console.log('counter tasks', tasks);
  }, [tasks]);

  return (
    <span>
      Total tasks: {tasks.work.length}
    </span>
  );
}

export default TasksCounter;
