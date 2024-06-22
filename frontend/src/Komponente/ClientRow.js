import React from 'react';
import PropTypes from 'prop-types';

const ClientRow = ({ client }) => {
  return (
    <tr>
      <td>{client.id}</td>
      <td>{client.client_name}</td>
      <td>{client.client_email}</td>
      <td>{client.client_phone}</td>
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
};

export default ClientRow;
