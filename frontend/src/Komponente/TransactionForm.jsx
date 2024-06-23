import React, { useState } from 'react';
import axios from 'axios';
import useFetchClients from './useFetchClients';
import useFetchProperties from './useFetchProperties';
import './TransactionForm.css';

const TransactionForm = () => {
  const { clients, loading: clientsLoading, error: clientsError } = useFetchClients();
  const { properties, loading: propertiesLoading, error: propertiesError } = useFetchProperties();
  
  const [client, setClient] = useState('');
  const [property, setProperty] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [amount, setAmount] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    try {
      const token = sessionStorage.getItem('auth_token');
      const response = await axios.post('http://127.0.0.1:8000/api/transactions', {
        property_id: property,
        client_id: client,
        transaction_date: transactionDate,
        amount: amount
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFormSuccess('Transaction created successfully!');
      setClient('');
      setProperty('');
      setTransactionDate('');
      setAmount('');
    } catch (error) {
      setFormError('Error creating transaction.');
    }
  };

  if (clientsLoading || propertiesLoading) return <div>Loading...</div>;
  if (clientsError || propertiesError) return <div>Error loading data.</div>;

  return (
    <div className="container">
      <div className="form-wrap">
        <h2 className="form-title">Create Transaction</h2>
        {formError && <div className="form-error">{formError}</div>}
        {formSuccess && <div className="form-success">{formSuccess}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="client">Client</label>
            <select id="client" value={client} onChange={(e) => setClient(e.target.value)} required>
              <option value="">Select Client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.client_name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="property">Property</label>
            <select id="property" value={property} onChange={(e) => setProperty(e.target.value)} required>
              <option value="">Select Property</option>
              {properties.map(property => (
                <option key={property.id} value={property.id}>{property.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="transactionDate">Transaction Date</label>
            <input
              type="date"
              id="transactionDate"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button button-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
