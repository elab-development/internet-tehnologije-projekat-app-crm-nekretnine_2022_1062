import React from 'react';
import useFetchClients from './useFetchClients';
import ClientRow from './ClientRow';
import './Clients.css';

const Clients = () => {
  const { clients, loading, error } = useFetchClients();

  if (loading) return <p className="loading">Loading clients...</p>;
  if (error) return <p className="error">Error loading clients: {error.message}</p>;

  return (
    <div className="clients-container">
      <h2 className="clients-title">Clients</h2>
      <table className="clients-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <ClientRow key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
