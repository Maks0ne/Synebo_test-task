import { FC, ReactNode } from 'react';

import styles from './main.module.scss';

import bg from '@/assets/bg.webp';

interface IWrapperProps {
  children: ReactNode;
}
const Main: FC<IWrapperProps> = ({ children }) => {
  return (
    <div>
      <img className={styles.bg} src={bg} alt="Mountains" />
      {children}
    </div>
  );
};

export default Main;
