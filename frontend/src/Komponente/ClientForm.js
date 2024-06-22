import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientForm = ({ client, onSuccess }) => {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: ''
  });

  useEffect(() => {
    if (client) {
      setFormData({
        client_name: client.client_name,
        client_email: client.client_email,
        client_phone: client.client_phone
      });
    } else {
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: ''
      });
    }
  }, [client]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('auth_token');

    try {
      const response = client
        ? await axios.put(`http://127.0.0.1:8000/api/clients/${client.id}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
          })
        : await axios.post('http://127.0.0.1:8000/api/clients', formData, {
            headers: { Authorization: `Bearer ${token}` }
          });

      onSuccess(response.data);
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: ''
      });
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="client_name"
        value={formData.client_name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="client_email"
        value={formData.client_email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="client_phone"
        value={formData.client_phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <button type="submit">{client ? 'Update' : 'Add'} Client</button>
    </form>
  );
};

export default ClientForm;
