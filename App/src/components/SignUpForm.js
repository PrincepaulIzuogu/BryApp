// App/src/components/SignUpForm.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import '../styles/signUpForm.css'; // Import CSS file

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await api.post('/signup/', formData); // Sending raw password
      console.log(response.data);
      // Redirect to login page after successful registration
      history.push('/signin');
    } catch (error) {
      console.error('Failed to register:', error.message);
    }
  };

  return (
    <div className="container"> {/* Apply container class */}
      <h2 className="title">Sign Up</h2> {/* Apply title class */}
      <form className="form" onSubmit={handleSubmit}> {/* Apply form class */}
        <input type="text" name="username" className="input" placeholder="Username" value={formData.username} onChange={handleChange} /> {/* Apply input class */}
        <input type="email" name="email" className="input" placeholder="Email" value={formData.email} onChange={handleChange} /> {/* Apply input class */}
        <input type="password" name="password" className="input" placeholder="Password" value={formData.password} onChange={handleChange} /> {/* Apply input class */}
        <button type="submit" className="button">Sign Up</button> {/* Apply button class */}
      </form>
    </div>
  );
};

export default SignUpForm;
