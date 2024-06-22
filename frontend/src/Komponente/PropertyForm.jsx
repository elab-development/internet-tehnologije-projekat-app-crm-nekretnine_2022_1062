import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PropertyForm.css';

const PropertyForm = ({ property, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name,
        address: property.address,
        price: property.price,
        description: property.description
      });
    } else {
      setFormData({
        name: '',
        address: '',
        price: '',
        description: ''
      });
    }
  }, [property]);

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
      const response = property
        ? await axios.put(`http://127.0.0.1:8000/api/properties/${property.id}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
          })
        : await axios.post('http://127.0.0.1:8000/api/properties', formData, {
            headers: { Authorization: `Bearer ${token}` }
          });

      onSuccess(response.data);
      setFormData({
        name: '',
        address: '',
        price: '',
        description: ''
      });
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="property-form">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <button type="submit">{property ? 'Update' : 'Add'} Property</button>
    </form>
  );
};

export default PropertyForm;
