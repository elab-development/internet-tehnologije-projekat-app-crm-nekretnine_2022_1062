 
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';  

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      setSuccess('Registration successful!');
      setError('');
       
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-wrap">
        <h2 className="form-title">Register</h2>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <button type="submit" className="button button-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
