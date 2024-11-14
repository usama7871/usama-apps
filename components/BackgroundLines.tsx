import React from 'react';
import styles from './BackgroundLines.module.css';

const BackgroundLines: React.FC = () => {
  return (
    <div className={styles.animationContainer}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`${styles.circle} ${styles[`circle${index + 1}`]}`}
        />
      ))}
    </div>
  );
};

export default BackgroundLines;
