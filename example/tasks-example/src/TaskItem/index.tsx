import React from 'react';
import { Task } from './tasks.store';

interface TaskItemProps {
  task: Task;
  onTaskCompleted: (t: Task) => void;
}

function TaskItem(props: TaskItemProps) {
  return (
    <div>
      {props.task.title}
      {props.task.isCompleted ? ' Completed' : ' Not completed'}

      {!props.task.isCompleted && (
        <button
          onClick={() => props.onTaskCompleted(props.task)}
        >
          Complete
        </button>
      )}
    </div>
  );
}

export default TaskItem;

