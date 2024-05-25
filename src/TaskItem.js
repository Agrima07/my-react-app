// TaskItem.js
import React, { useState } from 'react';

function TaskItem({ task, deleteTask, editTask, markAsCompleted }) {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    editTask(task.id, editedTask);
    setEditing(false);
  };

  return (
    <div>
      {!editing ? (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => setEditing(true)}>Edit</button>
          {!task.completed && <button onClick={() => markAsCompleted(task.id)}>Mark as Completed</button>}
        </div>
      ) : (
        <div>
          <input type="text" value={editedTask.title} onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} />
          <textarea value={editedTask.description} onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })} />
          <input type="date" value={editedTask.dueDate} onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })} />
          <button onClick={handleEdit}>Save</button>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
