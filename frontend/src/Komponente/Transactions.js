import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const navigate = useNavigate();

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

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const clientName = getClientName(transaction.client_id).toLowerCase();
    const propertyDetails = getPropertyDetails(transaction.property_id).toLowerCase();
    const userName = getUserName(transaction.user_id).toLowerCase();
    const searchTerm = search.toLowerCase();
    return (
      clientName.includes(searchTerm) ||
      propertyDetails.includes(searchTerm) ||
      userName.includes(searchTerm) ||
      transaction.id.toString().includes(searchTerm) ||
      transaction.transaction_date.toLowerCase().includes(searchTerm) ||
      transaction.amount.toString().includes(searchTerm)
    );
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const aValue = sortKey === 'client' ? getClientName(a.client_id) :
                   sortKey === 'property' ? getPropertyDetails(a.property_id) :
                   sortKey === 'user' ? getUserName(a.user_id) :
                   a[sortKey];
    const bValue = sortKey === 'client' ? getClientName(b.client_id) :
                   sortKey === 'property' ? getPropertyDetails(b.property_id) :
                   sortKey === 'user' ? getUserName(b.user_id) :
                   b[sortKey];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="transactions-container">
      <h2 className="transactions-title">Transactions</h2>
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <button onClick={() => navigate('/transactions/dodaj')} className="button button-primary">Add Transaction</button>
      <table className="transactions-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('property')}>Property</th>
            <th onClick={() => handleSort('client')}>Client</th>
            <th onClick={() => handleSort('user')}>User</th>
            <th onClick={() => handleSort('transaction_date')}>Date</th>
            <th onClick={() => handleSort('amount')}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
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
