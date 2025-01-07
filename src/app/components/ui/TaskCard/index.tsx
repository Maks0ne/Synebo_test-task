import { FC } from 'react';

import styles from './taskCard.module.scss';

interface TaskCardProps {
  task: { text: string; completed: boolean; id: number };
  toggleCompletion: () => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, toggleCompletion }) => {
  return (
    <div className={styles.taskWrapper}>
      <div className={styles.customCheckbox}>
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={toggleCompletion}
        />
        <label htmlFor={`task-${task.id}`} className={styles.checkmark}></label>
        <span className={`${styles.text} ${task.completed ? styles.completed : ''}`}>
          {task.text}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
