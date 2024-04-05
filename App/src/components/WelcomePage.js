// App/src/components/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/welcomePage.css'; // Import CSS file

const WelcomePage = () => {
  return (
    <div className="container"> {/* Apply container class */}
      <h2 className="title">Welcome to BryApp</h2> {/* Apply title class */}
      <p className="description">This is the Welcome Page.</p> {/* Apply description class */}
      <Link to="/signup" className="link">Sign Up</Link> {/* Apply link class */}
    </div>
  );
};

export default WelcomePage;
