// App/src/components/Dashboard.jsx
import React from 'react';
import '../styles/dashboardStyles.css'; // Import renamed CSS file

const Dashboard = ({ user, setUser }) => {
  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <div className="container"> {/* Apply container class */}
      <h2 className="title">Dashboard</h2> {/* Apply title class */}
      <div className="content"> {/* Apply content class */}
        {user ? (
          <div>
            <p className="message">Welcome, {user.username}!</p> {/* Apply message class */}
            <button className="button" onClick={handleSignOut}>Sign Out</button> {/* Apply button class */}
          </div>
        ) : (
          <p className="message">Please sign in to access the dashboard.</p> 
        )}
      </div>
    </div>
  );
};

export default Dashboard;
