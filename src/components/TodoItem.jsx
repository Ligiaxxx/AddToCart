import React from 'react';

function TodoItem({ task, fetchTasks }) {
  const deleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTasks(); // Refresh the tasks list after deleting a task
      } else {
        console.error('Failed to delete task:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <li>
      <span>{task.text}</span>
      <button onClick={deleteTask}>x</button>
    </li>
  );
}

export default TodoItem;
