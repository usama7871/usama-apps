// components/BackgroundLines.tsx

import React from 'react';
import styles from './BackgroundLines.module.css';

const BackgroundLines: React.FC = () => {
  return (
    <div className={styles.linesContainer}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className={`${styles.line} ${styles[`line${index + 1}`]}`}
        />
      ))}
    </div>
  );
};

export default BackgroundLines;
