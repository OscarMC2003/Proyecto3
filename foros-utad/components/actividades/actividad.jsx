"use client"
import React, { useState, useEffect } from 'react';
import user from '../notoken_redirect/notoken_redirect'
import { getUserId } from '@/utils/user';

const Actividad = ({ handleClose, show, id }) => {
  const [actividad, setActividad] = useState([]);

  const showHideClassName = show ? "fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 overflow-y-auto" : "hidden";
  const animationClassName = show ? "animated-fadeIn" : "animated-fadeOut";

  const [messages, setMessages] = useState([]);


  const handleJoinActivity = async () => {
    console.log("ID de la actividad al unirse:", id);

    try {
      const userId = await getUserId((localStorage.getItem('token')))
      const getUser = await fetch(`http://localhost:9000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const userData = await getUser.json();
      console.log("Datos del usuario:", userData);

      const response = await fetch(`http://localhost:9000/api/actividades/joinActivity/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userData })
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        alert(`No se pudo unirse a la actividad: ${errorMessage.message}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Te has unido a la actividad exitosamente.');
      //const data = await response.json();

    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };




  const deleteactividad = async (id) => {
    console.log("deleteactividad " + id);
    const token = localStorage.getItem('token')
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const respuesta = await fetch(window.location.origin.slice(0, -5) + ':9000/api/actividades/' + id, { method: "DELETE" }, options);
    if (respuesta) {
      const datos = await respuesta.text();
      console.log(datos);
      window.location.reload(false);
    } else {
      console.error("borrado no ok");
    }
  }
  const editactividad = () => {
    document.getElementById("actividad_asunto").setAttribute("contenteditable", "true");
    document.getElementById("actividad_objetivo").setAttribute("contenteditable", "true");
    document.getElementById("btn_edit_actividad").style.display = "none";
    document.getElementById("btn_edit_save_actividad").style.display = "block";
  }
  const saveeditactividad = async (id) => {
    var asunto = document.getElementById("actividad_asunto").innerHTML;
    var objetivo = document.getElementById("actividad_objetivo").innerHTML;
    const token = localStorage.getItem('token')
    const activity = {
      'asunto': asunto,
      'objetivo': objetivo
    }
    const respuesta = await fetch(window.location.origin.slice(0, -5) + ':9000/api/actividades/' + id, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activity)
    });
    if (respuesta) {
      const datos = await respuesta.text();
      console.log(datos);
      window.location.reload(false);
    } else {
      console.error("borrado no ok");
    }
  }
  useEffect(() => {
    const getMensajes = async () => {
      try {
        const token = localStorage.getItem('token')
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        const respuesta = await fetch(window.location.origin.slice(0, -5) + ':9000/api/foro/65f1dab639b3ca6de3a667ad/mensajes', options);
        if (respuesta.ok) {
          const datos = await respuesta.json();
          const mensajes = datos.map(mensaje => mensaje.texto);
          // Mostrar mensajes consola a modo comprobación
          console.log(mensajes)
          setMessages(mensajes);
        } else {
          console.error("Error obteniendo los mensajes");
        }
      } catch (error) {
        console.error("Error obteniendo mensajes del foro", error);
      }
    };

    const intervalo = setInterval(() => {
      if (show) {
        getMensajes();
      }
    }, 1000);

    if (show) {
      getMensajes();
    }

    return () => clearInterval(intervalo)
  }, [id, show]);
  const handleCloseOutside = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    // if (!id) return; // Manejar el caso donde id es null o undefined
    if (user) { // cuando no esta logeado, user es null
      console.log(user._id);
      // parametros disponibles: _id, email, iat (fecha de login), exp (fecha de expiracion)
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        console.log(token);
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        const response = await fetch(`${window.location.origin.slice(0, -5)}:9000/api/actividades/${id}`, options); // Corregir la construcción de la URL
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
      <div className="bg-opacity-25 p-8 rounded shadow-md max-w-screen-lg w-full my-8 mx-auto" style={{ marginTop: '20vh' }}>
        <header className="flex justify-between items-center mb-4">
          <img src="/images/Logo U-Tad.png" alt="Imagen Izquierda" style={{ width: '75px', height: 'auto' }} />
        </header>
        {actividad && (
          <div className="flex flex-col h-full">
            <div className="max-w-full mx-auto my-12">
              <div className="shadow-lg rounded-lg overflow-hidden">
                <img src="/images/cuadrado.png" alt="Actividad" className="w-full object-cover" style={{ height: '250px' }} />
                <div className="bg-white p-6 flex flex-col md:flex-row">
                  <div className="flex-grow w-2/3">
                    <h1 contenteditable="false" id="actividad_asunto" className="text-2xl font-bold mb-4 montBlack">{actividad.asunto}</h1>
                    <p contenteditable="false" id="actividad_objetivo" className="text-gray-700 max-w-2/3" style={{ wordWrap: 'break-word' }}>{actividad.objetivo}</p>
                    <div className="mt-4 border-t pt-4">
                      <h2 className="font-semibold mb-2">Documentos adjuntos:</h2>
                      <div className="flex flex-wrap gap-4">
                        <img src="/images/cuadrado.png" alt="Actividad" className="w-auto"></img>
                        <img src="/images/cuadrado.png" alt="Actividad" className="w-auto"></img>
                      </div>
                      <div className="flex flex-col mb-5">
                        <span className="font-bold">Comentarios:</span>
                        <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                          Agregar comentario
                        </button>
                        <div className="flex flex-col overflow-hidden mt-4" style={{ maxHeight: '30rem' }}>
                          {messages.slice(-4).map((message, index) => (
                            <div key={index} className="p-2">
                              <div className="bg-gray-200 p-2 rounded-lg inline-block">
                                <span className="backend-message">{message}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 pt-4 md:pt-0 md:pl-6  flex flex-col items-center justify-center">
                    <div className="flex space-x-2 mt-10 mb-10 justify-center">
                      <button id="btn_edit_save_actividad" onClick={() => saveeditactividad(id)} aria-label="Save" style={{ display: "none" }} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <img src="/images/GuardarModificaciones.png" alt="Save" />
                      </button>
                      <button id="btn_edit_actividad" onClick={() => editactividad()} aria-label="Edit" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <img src="/images/Modificar.png" alt="Edit" />
                      </button>
                      <button onClick={() => deleteactividad(id)} aria-label="Delete" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <img src="/images/Borrar.png" alt="Delete" />
                      </button>
                      <button aria-label="Calendario" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <img src="/images/Calendario.png" alt="Calendario" />
                      </button>
                      <button aria-label="Compartir" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <img src="/images/Compartir.png" alt="Compartir" />
                      </button>
                      <button aria-label="Bookmark" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <img src="/images/Guardar.png" alt="Bookmark" />
                      </button>
                    </div>
                    <div className="flex flex-col mb-4">
                      <span className="font-bold">Fecha:</span>
                      <span>{actividad.fecha}</span>
                      <span>{actividad.hora}</span>
                    </div>
                    <div className="flex flex-col mb-4 ">
                      <span className="font-bold">Lugar:</span>
                      <span>Pabellón 3, Ifema</span>
                    </div>
                    <div className="flex flex-col mb-4">
                      <span className="font-bold">Asistentes requeridos:</span>
                      {actividad.asistentesRequeridos && actividad.asistentesRequeridos.length > 0 ? (
                        <ul>
                          {actividad.asistentesRequeridos.map((asistente, index) => (
                            <li key={index}>{asistente.label}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>No hay asistentes requeridos</span>
                      )}
                    </div>

                    <div className="flex flex-col mb-5">
                      <span className="font-bold">Asistentes opcionales:</span>
                      {actividad.asistentesOpcionales && actividad.asistentesOpcionales.length > 0 ? (
                        <ul>
                          {actividad.asistentesOpcionales.map((asistente, index) => (
                            <li key={index}>{asistente.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>No hay asistentes opcionales</span>
                      )}
                    </div>

                    <div className='flex w-auto justify-center'>
                      <button onClick={() => handleJoinActivity()} className="mt-5 bg-blue-600 text-white py-4 px-10 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                        Unirse
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );


};

export default Actividad;
