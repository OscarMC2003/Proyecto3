import React from 'react';

function RectangleList(foros) {
  const activities = [
    { title: 'Actividad 1', subtitle: 'Descripción de la actividad 1' },
    { title: 'Actividad 2', subtitle: 'Descripción de la actividad 2' },
    { title: 'Actividad 3', subtitle: 'Descripción de la actividad 3' },
  ];

  return (
    <div style={{ width: '100%' }}>
      {foros.foros.map((foros, index) => (
        <div key={index} style={{
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '25px',
          borderRadius: '8px',
          width: '100%', // Hacer que cada caja ocupe todo el ancho disponible
        }}>
          <h2>{foros.name}</h2>
          <p>{foros.descripcion}</p>
        </div>
      ))}
    </div>
  );
}

export default RectangleList;
