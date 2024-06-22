import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/properties', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProperties(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, setProperties, loading, error };
};

export default useFetchProperties;
