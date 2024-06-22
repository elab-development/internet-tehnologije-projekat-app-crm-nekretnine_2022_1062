import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/clients', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClients(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, setClients, loading, error };
};

export default useFetchClients;
