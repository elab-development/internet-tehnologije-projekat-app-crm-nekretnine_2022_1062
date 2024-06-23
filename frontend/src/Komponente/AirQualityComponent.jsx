import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AirQualityComponent.css';

const AirQualityComponent = () => {
  const [city, setCity] = useState('Belgrade');
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cities = [
    'Belgrade',
    'London',
    'Paris',
    'Berlin',
    'Madrid',
    'Rome',
    'Vienna',
    'Prague',
    'Budapest',
    'Amsterdam'
  ];

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/airquality', {
          params: {
            city: city
          },
          headers: {
            'X-Api-Key': 'cdBp5C7hVS7gbjOonMGK5KRnvweJwu3ie2B5TQAt'
          }
        });
        setAirQualityData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAirQualityData();
  }, [city]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error fetching data: {error.message}</div>;

  return (
    <div className="air-quality-container">
      <h1>Air Quality in {city}</h1>
      <select value={city} onChange={(e) => setCity(e.target.value)} className="city-select">
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {airQualityData && (
        <div>
          <h2>Overall AQI: {airQualityData.overall_aqi}</h2>
          <ul>
            {Object.keys(airQualityData).map((key) => {
              if (key !== 'overall_aqi') {
                return (
                  <li key={key}>
                    <strong>{key.toUpperCase()}:</strong> {airQualityData[key].concentration} μg/m³ (AQI: {airQualityData[key].aqi})
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AirQualityComponent;
