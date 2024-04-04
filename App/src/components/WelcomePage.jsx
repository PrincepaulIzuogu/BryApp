// App/src/components/WelcomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div>
      <h2>Welcome to BryApp</h2>
      <p>This is the Welcome Page.</p>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default WelcomePage;
