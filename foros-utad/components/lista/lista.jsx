import React, { useState, useEffect } from 'react';
import ForoInterior from '../foro/foroInterior';
import { useRouter } from 'next/navigation'

function RectangleList({ foros, idUserIniciado }) { // Se agrega destructuración para recibir el prop correctamente

  //const [showPopup, setShowPopup] = useState(null); // Se inicializa con null
  /*const togglePopup = (foroId) => {
    setShowPopup(foroId === showPopup ? null : foroId);
  };*/

  const router = useRouter()

  const handleClick = (foroId) => {
    
    router.push(`/foroInterior?foroId=${foroId}&idUserIniciado=${idUserIniciado}`);
  }


  return (
    <div style={{ width: '100%' }}>
      {foros.map((foro, index) => ( // Se cambia el nombre de la variable para evitar conflicto de nombres
        <div key={index} style={{ // Se mueve el key al contenedor div
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '25px',
          borderRadius: '8px',
          width: '100%', // Hacer que cada caja ocupe todo el ancho disponible
        }}>
          <button style={{ width: '100%' }} onClick={() =>handleClick(foro._id) }>
            <h2 className='montSEMI2 mb-4'>{foro.name}</h2>
            <p>{foro.descripcion}</p>
          </button>
          {/* {showPopup === foro._id && <ForoInterior idUserIniciado={idUserIniciado} handleClose={() => togglePopup(foro._id)} show={showPopup} id={foro._id} />} */}
        </div>
      ))}
    </div>
  );
}

export default RectangleList;
