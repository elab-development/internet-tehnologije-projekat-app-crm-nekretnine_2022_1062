import React from 'react';
import useFetchTransactions from './useFetchTransactions';
import useFetchClients from './useFetchClients';
import useFetchProperties from './useFetchProperties';
import useFetchUsers from './useFetchUsers';
import './Transactions.css';

const Transactions = () => {
  const { transactions, loading: transactionsLoading, error: transactionsError } = useFetchTransactions();
  const { clients, loading: clientsLoading, error: clientsError } = useFetchClients();
  const { properties, loading: propertiesLoading, error: propertiesError } = useFetchProperties();
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();

  if (transactionsLoading || clientsLoading || propertiesLoading || usersLoading) {
    return <p className="loading">Loading data...</p>;
  }

  if (transactionsError || clientsError || propertiesError || usersError) {
    return <p className="error">Error loading data</p>;
  }

  const getClientName = (clientId) => {
    const client = clients.find((client) => client.id === clientId);
    return client ? client.client_name : 'Unknown';
  };

  const getPropertyDetails = (propertyId) => {
    const property = properties.find((property) => property.id === propertyId);
    return property ? `${property.name}, ${property.address}` : 'Unknown';
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="transactions-container">
      <h2 className="transactions-title">Transactions</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Property</th>
            <th>Client</th>
            <th>User</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{getPropertyDetails(transaction.property_id)}</td>
              <td>{getClientName(transaction.client_id)}</td>
              <td>{getUserName(transaction.user_id)}</td>
              <td>{transaction.transaction_date}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
