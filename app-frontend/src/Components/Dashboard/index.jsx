import React from 'react';
import styles from './style.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1>Welcome to the Dashboard</h1>
      <p>This is your secure dashboard area.</p>
    </div>
  );
};

export default Dashboard;
