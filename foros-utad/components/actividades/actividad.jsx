import React, { useState, useEffect } from 'react';
import check_token from '../notoken_redirect/notoken_redirect';

const Actividad = ({ handleClose, show, id }) => {
  const [actividad, setActividad] = useState();

  const showHideClassName = show ? "fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 overflow-y-auto" : "hidden";
  const animationClassName = show ? "animated-fadeIn" : "animated-fadeOut";

  const handleCloseOutside = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(window.location.origin.slice(0, -5) + `:9000/api/actividades/${id}`);
        const data = await response.json();
        setActividad(data);
      } catch (error) {
        console.log("Error al llamar a las actividades:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={`${showHideClassName} ${animationClassName}`} onClick={handleCloseOutside}>
      {/* <div className="fixed inset-0 flex items-center justify-center" onClick={(event) => event.stopPropagation()}> */}
        <div className="bg-opacity-25 p-8 rounded shadow-md max-w-screen-lg w-full my-8"> {/* Agregado margen vertical */}
          <header className="flex justify-between items-center mb-4">
            <img src="/images/cuadrado.png" alt="Imagen Izquierda" style={{ width: '75px', height: 'auto' }} />
            <div>
              {/* Eliminado el evento onClick del botón de cerrar */}
              <button onClick={handleClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Cerrar</button>
            </div>
          </header>
          {/* {actividad && ( */}
            <div className="flex flex-col h-full">
              {/* <div className="pt-16 p-20 bg-gray-200 w-full flex-grow overflow-y-auto"> */}
                <div className="max-w-full mx-auto my-12">
                  <div className="shadow-lg rounded-lg overflow-hidden">
                    <img src="/images/cuadrado.png" alt="Actividad" className="w-full object-cover" style={{ height: '250px' }} />
                    <div className="bg-white p-6 flex flex-col md:flex-row">
                      <div className="flex-grow w-2/3">
                        <h1 className="text-2xl font-bold mb-4 montBlack">Actividad 1</h1>                        
                        <p className="text-gray-700">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labo.
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labo.
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labo
                        </p>
                        <div className="mt-4 border-t pt-4">
                          <h2 className="font-semibold mb-2">Documentos adjuntos:</h2>
                          <div className="flex flex-wrap gap-4">
                            <img src="/images/cuadrado.png" alt="Actividad" className="w-auto"></img>
                            <img src="/images/cuadrado.png" alt="Actividad" className="w-auto"></img>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 pt-4 md:pt-0 md:pl-6  flex flex-col items-center justify-center">
                        <div className="flex space-x-2 mt-10 mb-10 justify-center">
                          <button aria-label="Calendario" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                            {/* Insert your calendar icon here */}
                            <img src="/images/Calendario.png" alt="Calendario" />
                          </button>

                          <button aria-label="Compartir" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                            {/* Insert your share icon here */}
                            <img src="/images/Compartir.png" alt="Compartir" />
                          </button>

                          <button aria-label="Bookmark" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                            {/* Insert your bookmark icon here */}
                            <img src="/images/Guardar.png" alt="Bookmark" />
                          </button>
                        </div>
                        <div className="flex flex-col mb-4">
                          <span className="font-bold">Fecha:</span>
                          <span>12 de marzo 2024</span>
                          <span>10:30 - 12:00 am</span>
                        </div>
                        <div className="flex flex-col mb-4">
                          <span className="font-bold">Lugar:</span>
                          <span>Pabellón 3, Ifema</span>
                        </div>
                        <div className="flex flex-col mb-4">
                          <span className="font-bold">Asistentes requeridos:</span>
                          <ul>
                            <li>3/10 alumnos de INSO</li>
                            <li>5/10 alumnos de DIDI</li>
                            <li>10/10 alumnos de ANIV</li>
                          </ul>
                        </div>
                        <div className="flex flex-col mb-5">
                          <span className="font-bold">Asistentes opcionales:</span>
                          <span>No hay asistentes opcionales</span>
                        </div>
                        <div className='flex w-auto justify-center'>
                          <button className="mt-5  bg-blue-600 text-white py-4 px-10 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                            Unirse
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {/* </div> */}
            </div>
          {/* )} */}
        </div>
      {/* </div> */}
    </div>
  );
};

export default Actividad;
