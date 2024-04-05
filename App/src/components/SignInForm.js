// App/src/components/SignInForm.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import '../styles/signInForm.css'; // Import CSS file

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/signin/', formData);
      console.log(response.data);
      // Redirect to dashboard after successful login
      history.push('/dashboard');
    } catch (error) {
      console.error('Failed to sign in:', error.message);
    }
  };

  return (
    <div className="container"> {/* Apply container class */}
      <h2 className="title">Sign In</h2> {/* Apply title class */}
      <form className="form" onSubmit={handleSubmit}> {/* Apply form class */}
        <input type="email" name="email" className="input" placeholder="Email" value={formData.email} onChange={handleChange} /> {/* Apply input class */}
        <input type="password" name="password" className="input" placeholder="Password" value={formData.password} onChange={handleChange} /> {/* Apply input class */}
        <button type="submit" className="button">Sign In</button> {/* Apply button class */}
      </form>
    </div>
  );
};

export default SignInForm;
