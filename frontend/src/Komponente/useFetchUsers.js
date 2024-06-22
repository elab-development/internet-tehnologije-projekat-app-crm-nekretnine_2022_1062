import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, setUsers, loading, error };
};

export default useFetchUsers;
