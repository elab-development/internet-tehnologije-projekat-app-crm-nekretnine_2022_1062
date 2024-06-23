import React from 'react';
import useFetchUsers from './useFetchUsers';
import './UsersTableComponent.css';

const UsersTableComponent = () => {
  const { users, loading, error } = useFetchUsers();

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error fetching data: {error.message}</div>;

  return (
    <div className="users-container">
      <h1 className="users-title">Users List</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.admin ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTableComponent;
