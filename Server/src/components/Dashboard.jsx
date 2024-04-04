// App/src/components/Dashboard.jsx
import React from 'react';

const Dashboard = ({ user, setUser }) => {
  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>Please sign in to access the dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
