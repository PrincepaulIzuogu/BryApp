// App/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import WelcomePage from './components/WelcomePage';
import Dashboard from './components/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  const handleSignUp = async (formData) => {
    // Implement signup logic here (e.g., send formData to the backend)
    console.log('Sign up:', formData);
  };

  const handleSignIn = async (formData) => {
    // Implement signin logic here (e.g., send formData to the backend)
    console.log('Sign in:', formData);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
          <Route path="/signup">
            <SignUpForm onSubmit={handleSignUp} />
          </Route>
          <Route path="/signin">
            <SignInForm onSubmit={handleSignIn} />
          </Route>
          <Route path="/dashboard">
            <Dashboard user={user} setUser={setUser} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;