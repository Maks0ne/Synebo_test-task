import { FC } from 'react';

import styles from './main.module.scss';

import bg from '@/assets/bg.webp';

const Main: FC = () => {
  return (
    <div className={styles.main}>
      <img className={styles.bg} src={bg} alt="Mountains" />
    </div>
  );
};

export default Main;
