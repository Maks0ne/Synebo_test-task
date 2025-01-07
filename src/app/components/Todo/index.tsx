import { FC, useEffect, useState } from 'react';

import TaskCard from '../ui/TaskCard';
import styles from './todo.module.scss';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

const Todo: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');

  const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setNewTaskText('');
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    );
  };

  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>T O D O</h1>
      <div className={styles.newTask}>
        <div className={styles.disabledCheckbox} />
        <input
          type="text"
          placeholder="Create a new todo..."
          className={styles.inputField}
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.taskWrapper}>
        <div className={styles.taskContainer}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              toggleCompletion={() => toggleTaskCompletion(task.id)}
            />
          ))}
        </div>
        <nav className={styles.taskHandler}>
          {tasks.filter((task) => task.completed).length} items left
          <section>
            <button
              onClick={() => setFilter('all')}
              className={filter === 'all' ? styles.active : ''}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={filter === 'active' ? styles.active : ''}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? styles.active : ''}
            >
              Completed
            </button>
          </section>
          <button onClick={clearCompleted}>Clear Completed</button>
        </nav>
      </div>

      <span className={styles.dnd}>Drag and drop to reorder list</span>
    </div>
  );
};

export default Todo;
