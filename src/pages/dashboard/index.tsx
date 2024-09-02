import { Button } from '@mantine/core';
import styles from './styles.module.css';

export const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h2>track your daily mood</h2>
      <Button variant='filled' radius='lg'>
        Submit
      </Button>
    </div>
  );
};
