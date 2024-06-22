import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const PropertyRow = ({ property, onEdit, onDelete }) => {
  const handleDelete = async () => {
    const token = sessionStorage.getItem('auth_token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/properties/${property.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onDelete(property.id);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <tr>
      <td>{property.id}</td>
      <td>{property.name}</td>
      <td>{property.address}</td>
      <td>{property.price}</td>
      <td>{property.description}</td>
      <td>
        <button onClick={() => onEdit(property)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

PropertyRow.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PropertyRow;
