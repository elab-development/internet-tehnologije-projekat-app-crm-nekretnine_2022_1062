 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';   

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'admin@example.com',
    password: 'password'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      const { user, token } = response.data;
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);
      setSuccess('Login successful!');
      setError('');
      navigate('/main');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-wrap">
        <h2 className="form-title">Login</h2>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="button button-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
