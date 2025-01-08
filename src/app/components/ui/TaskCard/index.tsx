import { FC } from 'react';

import styles from './taskCard.module.scss';

interface TaskCardProps {
  task: { id: number; text: string; completed: boolean };
  toggleCompletion: () => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, toggleCompletion }) => (
  <div className={styles.taskWrapper}>
    <label className={styles.customCheckbox}>
      <input type="checkbox" checked={task.completed} onChange={toggleCompletion} />
      <span className={styles.checkmark}></span>
    </label>
    <span className={`${styles.text} ${task.completed ? styles.completed : ''}`}>{task.text}</span>
  </div>
);

export default TaskCard;
