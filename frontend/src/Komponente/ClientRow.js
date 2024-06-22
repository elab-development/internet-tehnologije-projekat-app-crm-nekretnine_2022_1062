import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ClientRow = ({ client, onEdit, onDelete }) => {
  const handleDelete = async () => {
    const token = sessionStorage.getItem('auth_token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/clients/${client.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onDelete(client.id);
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <tr>
      <td>{client.id}</td>
      <td>{client.client_name}</td>
      <td>{client.client_email}</td>
      <td>{client.client_phone}</td>
      <td>
        <button onClick={() => onEdit(client)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

ClientRow.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    client_name: PropTypes.string.isRequired,
    client_email: PropTypes.string.isRequired,
    client_phone: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ClientRow;
