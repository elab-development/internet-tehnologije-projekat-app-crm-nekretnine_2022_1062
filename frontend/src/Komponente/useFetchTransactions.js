import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, setTransactions, loading, error };
};

export default useFetchTransactions;
