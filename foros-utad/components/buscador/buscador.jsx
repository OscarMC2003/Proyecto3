import React, { useState } from 'react';

const Buscador = () => {
    return (
        <div style={{
            position: 'relative',
          }}>
            <input type="text" style={{
              padding: '10px 30px 10px 40px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: 'rgba(128, 128, 128, 0.5)',
              color: 'white',
              width: '100%',
            }} placeholder="Buscar..." />
            <div style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '18px',
              color: '#666',
            }}>
              &#128269;
            </div>
            <span style={{
              visibility: 'hidden',
              width: '120px',
              backgroundColor: 'black',
              color: '#fff',
              textAlign: 'center',
              borderRadius: '6px',
              padding: '5px 0',
              position: 'absolute',
              zIndex: '1',
              bottom: '125%',
              left: '50%',
              marginLeft: '-60px',
              opacity: '0',
              transition: 'opacity 0.3s',
            }}>
              Introduce tu búsqueda
            </span>
        </div>
    );
}

export default Buscador;