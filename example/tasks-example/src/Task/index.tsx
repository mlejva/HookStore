import React from 'react';
import { Task as TaskType } from './tasks.store';

interface TaskProps {
  task: TaskType;
  onTaskCompleted: (t: TaskType) => void;
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
