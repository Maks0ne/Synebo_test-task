import { FC } from 'react';

import styles from './taskCard.module.scss';

interface TaskCardProps {
  task: { id: number; text: string; completed: boolean };
  toggleCompletion: () => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, toggleCompletion }) => (
  <div className={styles.taskWrapper}>
    <div className={styles.customCheckbox}>
      <input
        type="checkbox"
        id={`task-${task.id}`}
        checked={task.completed}
        onChange={toggleCompletion}
      />
      <label htmlFor={`task-${task.id}`} className={styles.checkmark}></label>
    </div>
    <span className={`${styles.text} ${task.completed ? styles.completed : ''}`}>{task.text}</span>
  </div>
);

export default TaskCard;
