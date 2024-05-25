// TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask, editTask, markAsCompleted }) {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
          markAsCompleted={markAsCompleted}
        />
      ))}
    </div>
  );
}

export default TaskList;
