import React, { useState } from 'react';
import useFetchClients from './useFetchClients';
import ClientRow from './ClientRow';
import ClientForm from './ClientForm';
import './Clients.css';

const Clients = () => {
  const { clients, setClients, loading, error } = useFetchClients();
  const [editingClient, setEditingClient] = useState(null);

  const handleAddOrUpdateClient = (client) => {
    if (editingClient) {
      setClients((prevClients) =>
        prevClients.map((c) => (c.id === client.id ? client : c))
      );
    } else {
      setClients((prevClients) => [...prevClients, client]);
    }
    setEditingClient(null);
  };

  const handleDeleteClient = (id) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== id));
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
  };

  if (loading) return <p className="loading">Loading clients...</p>;
  if (error) return <p className="error">Error loading clients: {error.message}</p>;

  return (
    <div className="clients-container">
      <h2 className="clients-title">Clients</h2>
      <ClientForm client={editingClient} onSuccess={handleAddOrUpdateClient} />
      <table className="clients-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <ClientRow
              key={client.id}
              client={client}
              onEdit={handleEditClient}
              onDelete={handleDeleteClient}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
