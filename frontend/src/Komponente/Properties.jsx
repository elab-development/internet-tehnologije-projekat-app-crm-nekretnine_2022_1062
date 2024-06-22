import React, { useState } from 'react';
import useFetchProperties from './useFetchProperties';
import PropertyRow from './PropertyRow';
import PropertyForm from './PropertyForm';
import './Properties.css';

const Properties = () => {
  const { properties, setProperties, loading, error } = useFetchProperties();
  const [editingProperty, setEditingProperty] = useState(null);

  const handleAddOrUpdateProperty = (property) => {
    if (editingProperty) {
      setProperties((prevProperties) =>
        prevProperties.map((p) => (p.id === property.id ? property : p))
      );
    } else {
      setProperties((prevProperties) => [...prevProperties, property]);
    }
    setEditingProperty(null);
  };

  const handleDeleteProperty = (id) => {
    setProperties((prevProperties) => prevProperties.filter((property) => property.id !== id));
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
  };

  if (loading) return <p className="loading">Loading properties...</p>;
  if (error) return <p className="error">Error loading properties: {error.message}</p>;

  return (
    <div className="properties-container">
      <h2 className="properties-title">Properties</h2>
      <PropertyForm property={editingProperty} onSuccess={handleAddOrUpdateProperty} />
      <table className="properties-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <PropertyRow
              key={property.id}
              property={property}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Properties;
