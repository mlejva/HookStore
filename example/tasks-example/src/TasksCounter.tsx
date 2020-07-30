import React, { useEffect } from 'react';
import { useStore } from 'hookstore';
import { selectTasks } from './Tasks/tasks.store';

function TasksCounter() {
  const [tasks] = useStore(selectTasks);

  useEffect(() => {
    console.log('counter tasks', tasks);
  }, [tasks.all]);

  useEffect(() => {
    console.log('Neste object change -', tasks.nested.object.alsoNoUpdate);
  }, [tasks.nested.object.alsoNoUpdate])

  return (
    <span>
      Total tasks: {tasks.all.length}
    </span>
  );
}

export default TasksCounter;
