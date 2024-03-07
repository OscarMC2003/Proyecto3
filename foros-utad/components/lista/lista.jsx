import React from 'react';

function RectangleList() {
  const activities = [
    { title: 'Actividad 1', subtitle: 'Descripción de la actividad 1' },
    { title: 'Actividad 2', subtitle: 'Descripción de la actividad 2' },
    { title: 'Actividad 3', subtitle: 'Descripción de la actividad 3' },
  ];

  return (
    <div style={{ width: '100%' }}>
      {activities.map((activity, index) => (
        <div key={index} style={{
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '25px',
          borderRadius: '8px',
          width: '100%', // Hacer que cada caja ocupe todo el ancho disponible
        }}>
          <h2>{activity.title}</h2>
          <p>{activity.subtitle}</p>
        </div>
      ))}
    </div>
  );
}

export default RectangleList;
