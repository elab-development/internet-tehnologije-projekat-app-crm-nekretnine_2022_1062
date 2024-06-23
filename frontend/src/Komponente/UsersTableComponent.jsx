import React, { useState } from 'react';
import useFetchUsers from './useFetchUsers'; 
import './UsersTableComponent.css';
import useFetchUserTransactions from './useFetchUserTransaction';

const UsersTableComponent = () => {
  const { users, loading, error } = useFetchUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [filter, setFilter] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { transactions, loading: transactionsLoading, error: transactionsError } = useFetchUserTransactions(selectedUserId);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error fetching data: {error.message}</div>;

  return (
    <div className="users-container">
      <h1 className="users-title">Users List</h1>
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
      />
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.admin ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => setSelectedUserId(user.id)}>View Transactions</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {selectedUserId && (
        <div className="transactions-container">
          <h2 className="transactions-title">Transactions for User ID: {selectedUserId}</h2>
          {transactionsLoading ? (
            <div className="loading">Loading transactions...</div>
          ) : transactionsError ? (
            <div className="error">Error fetching transactions: {transactionsError.message}</div>
          ) : (
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
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.property_id}</td>
                    <td>{transaction.client_id}</td>
                    <td>{transaction.user_id}</td>
                    <td>{transaction.transaction_date}</td>
                    <td>{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersTableComponent;
