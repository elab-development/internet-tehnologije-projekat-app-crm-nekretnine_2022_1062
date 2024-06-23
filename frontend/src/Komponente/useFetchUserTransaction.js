import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUserTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchTransactions = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get(`http://127.0.0.1:8000/api/transactions/user/${userId}`, {
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
  }, [userId]);

  return { transactions, loading, error };
};

export default useFetchUserTransactions;
