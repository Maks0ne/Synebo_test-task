import { FC, useState } from 'react';

import useTodo from '../../../hooks/useTodo';
import TaskCard from '../ui/TaskCard';
import styles from './todo.module.scss';

const Todo: FC = () => {
  const { tasks, addTask, toggleTaskCompletion, clearCompleted, filteredTasks, filter, setFilter } =
    useTodo();
  const [newTaskText, setNewTaskText] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask(newTaskText);
      setNewTaskText('');
    }
  };

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
