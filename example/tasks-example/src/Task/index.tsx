import React from 'react';
import { TodoItem } from './tasks.store';

interface TaskProps {
  task: TodoItem;
  onTaskCompleted: (t: TodoItem) => void;
}

function Task(props: TaskProps) {
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

export default Task;
