"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import user from '../notoken_redirect/notoken_redirect'
import Actividad from "@/components/actividades/actividad"; // Mantener la importación del componente Actividad

async function response_to_array(resp) {
  if (resp && resp.json) {
    const data = await resp.json();
    for (var i = 0; i < data.length; i++) {
      console.log(data[i])
    }
    return data;
  }
  return [];
}

const Actividades = ({IdUserIniciado}) => {

  const router = useRouter()

  //esto lo tendra que recibir del backend
  let [actividades, setActividades] = useState([]);

  //ya filtrados por tipo de activuidades
  const [actividadesCoord, setActividadesCoord] = useState([]);
  const [actividadesAlum, setActividadesAlum] = useState([]);
  const [actividadesPriv, setActividadesPriv] = useState([]);

  // Estados para manejar la visibilidad de las opciones
  const [mostrarTitulacion, setMostrarTitulacion] = useState(false);
  const [mostrarCurso, setMostrarCurso] = useState(false);
  const [mostrarGrupo, setMostrarGrupo] = useState(false);
  const [mostrarAsistentes, setMostrarAsistentes] = useState(false);
  const [mostrarFecha, setMostrarFecha] = useState(false);

  // Opciones para cada categoría
  const opcionesTitulacion = ["Opción 1", "Opción 2", "Opción 3"];
  const opcionesCurso = ["Opción A", "Opción B", "Opción C"];
  const opcionesGrupo = ["Grupo 1", "Grupo 2", "Grupo 3"];
  const opcionesAsistentes = ["Asistentes 1", "Asistentes 2", "Asistentes 3"];

  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const [contenidoVisible, setContenidoVisible] = useState("Texto 1");

  const [showPopup, setShowPopup] = useState(false);

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };

  const togglePopup = (actividadId) => {
    setShowPopup(actividadId === showPopup ? null : actividadId);
  };

  useEffect(() => {
    if (fechaSeleccionada) {
      const filteredActividades = actividades.filter(actividad => {
        const actividadDate = new Date(actividad.fecha);
        return actividadDate.toDateString() === fechaSeleccionada.toDateString();
      });
      setActividades(filteredActividades);
    } else {
      // Si no hay fecha seleccionada, mostramos todas las actividades
      const filterActividades = () => {
        const filteredCoord = actividades.filter(actividad => actividad.tipoActividad.includes("coordinacion"));
        setActividadesCoord(filteredCoord);
        
        const filteredAlum = actividades.filter(actividad => actividad.tipoActividad.includes("alumnos"));
        setActividadesAlum(filteredAlum);
        
        const filteredPriv = actividades.filter(actividad => actividad.tipoActividad.includes("privadas"));
        setActividadesPriv(filteredPriv);
      };
  
      filterActividades();
    }
  }, [fechaSeleccionada, actividades]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }

        const response = await fetch(window.location.origin.slice(0, -5) + ':9000/api/actividades', options);
        
        console.log("response actividades" + response);
        const data = await response_to_array(response);
        setActividades(data);
      } catch (error) {
        console.log("Error al llamar a las actividades:", error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const filterActividades = () => {
      const filteredCoord = actividades.filter(actividad => actividad.tipoActividad.includes("coordinacion"));
      setActividadesCoord(filteredCoord);
      
      const filteredAlum = actividades.filter(actividad => actividad.tipoActividad.includes("alumnos"));
      setActividadesAlum(filteredAlum);
      
      const filteredPriv = actividades.filter(actividad => actividad.tipoActividad.includes("privadas"));
      setActividadesPriv(filteredPriv);
    };

    filterActividades();
  }, [actividades]);

  const handleCambioAForos = () =>{
    router.push(`/foroAlumnos?id=${IdUserIniciado}`);
  }

  const handleCambioAUsuario = () =>{
    router.push(`/perfil?id=${IdUserIniciado}`);
  }

  const handleCrearActividad = () => {
    router.push('/crearActividad');
  };

  /*const handleIrActividad = (identificadorActividad) =>{
    router.push(`/actividad?id=${IdUserIniciado}&acti=${identificadorActividad}`)
      
  }*/

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: '#0a1229', padding: '10px', textAlign: 'center', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Imagen a la izquierda */}
        <img src="/images/Logo U-Tad.png" alt="Imagen Izquierda" style={{ width: '75px', height: 'auto' }} />

        {/* Contenedor vacío en el centro */}
        <div style={{ flex: 1 }}></div>

        {/* Botón seguido de otra imagen a la derecha */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={handleCambioAForos} style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Comunidad de Alumnos</button>
            <button onClick={handleCambioAUsuario}>
              <img src="/images/userVacio.png" alt="Imagen Derecha" style={{ width: '50px', height: 'auto' }} />
            </button> 
        </div>
      </header>

      {/* Resto del contenido de la página */}
      <div style={{ flex: 1, padding: '20px', background: 'white' }}>
        <h1 style={{ color: '#333' }}>Contenido de la página de Actividades</h1>
      </div>

      {/* Nuevo contenedor para dividir el resto de la página en dos partes */}
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {/* Contenido de la primera parte (pegado a la izquierda) */}
        <div style={{ flex: '0 0 30%', padding: '20px', background: 'white', marginLeft: 0, position: 'fixed', left: 0, top: '60px', bottom: 0, width: '30%' }}>
          <h1 className="montExtra">Actividades</h1>
          <p className="montSEMI2" style={{ color: '#333', marginLeft: '15%', marginTop: '10%' }}>Filtrar por:</p>
          {/* Cuadro centrado para "Filtrar por:" y opciones */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', background: '#eee', width: "70%", marginLeft: '15%', marginTop: '5%' }}>
            <div style={{ margin: '10px 0' }}>
              <p className="montRegular" style={{ cursor: 'pointer', color: 'black' }} onClick={() => setMostrarTitulacion(!mostrarTitulacion)}>Titulación</p>
              {mostrarTitulacion && (
                <ul>
                  {opcionesTitulacion.map((opcion, index) => (
                    <li key={index}>{opcion}</li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ margin: '10px 0' }}>
              <p className="montRegular" style={{ cursor: 'pointer', color: 'black' }} onClick={() => setMostrarCurso(!mostrarCurso)}>Curso</p>
              {mostrarCurso && (
                <ul>
                  {opcionesCurso.map((opcion, index) => (
                    <li key={index}>{opcion}</li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ margin: '10px 0' }}>
              <p className="montRegular" style={{ cursor: 'pointer', color: 'black' }} onClick={() => setMostrarGrupo(!mostrarGrupo)}>Grupo</p>
              {mostrarGrupo && (
                <ul>
                  {opcionesGrupo.map((opcion, index) => (
                    <li key={index}>{opcion}</li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ margin: '10px 0' }}>
              <p className="montRegular" style={{ cursor: 'pointer', color: 'black' }} onClick={() => setMostrarAsistentes(!mostrarAsistentes)}>Asistentes</p>
              {mostrarAsistentes && (
                <ul>
                  {opcionesAsistentes.map((opcion, index) => (
                    <li key={index}>{opcion}</li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ margin: '10px 0' }}>
              <p className="montRegular" style={{ cursor: 'pointer', color: 'black' }} onClick={() => setMostrarFecha(!mostrarFecha)}>Fecha</p>
              {mostrarFecha && (
                <DatePicker
                selected={fechaSeleccionada}
                onChange={date => setFechaSeleccionada(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar fecha"
              />
              )}
            </div>
          </div>
          <button onClick={handleCrearActividad} style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginLeft: '40%', marginTop: '15%' }}>Crear Actividad</button>
        </div>

        {/* Contenido de la segunda parte (pegado a la derecha) */}
        <div style={{ flex: '1', padding: '20px', background: '#eee', top: '50px', bottom: 0, width: '70%', position: 'fixed', left: '30%', overflow: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }}>
            <p className="montBlack" style={{ cursor: 'pointer', color: contenidoVisible === "Texto 1" ? 'black' : 'black', textDecoration: contenidoVisible === "Texto 1" ? 'underline' : 'none' }} onClick={() => setContenidoVisible("Texto 1")}>Coordinación</p>
            <p className="montBlack" style={{ cursor: 'pointer', color: contenidoVisible === "Texto 2" ? 'black' : 'black', textDecoration: contenidoVisible === "Texto 2" ? 'underline' : 'none' }} onClick={() => setContenidoVisible("Texto 2")}>Alumnos</p>
            <p className="montBlack" style={{ cursor: 'pointer', color: contenidoVisible === "Texto 3" ? 'black' : 'black', textDecoration: contenidoVisible === "Texto 3" ? 'underline' : 'none' }} onClick={() => setContenidoVisible("Texto 3")}>Privadas</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {/* Estructura para mostrar actividades */}
            {contenidoVisible === "Texto 1" && (
              <>
                {/* {Array.from({ length: 10 }, (_, index) => (
                  <div key={index} style={{ width: '45%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                    <img src="/images/cuadrado.png" alt={`Actividad ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                    <p className="montRegular" style={{ color: '#333' }}>Actividad {index + 1}</p>
                    <p className="montLight" style={{ color: '#333' }}>Código explicativo</p>
                  </div>
                ))} */}


              {Array.isArray(actividadesCoord) && actividadesCoord.map((actividades) => (
                  <li key={actividades._id} className="list-none p-2 mb-4 bg-gray-200 rounded-lg shadow-md grid-cols-2 gap-4">
                    <div>
                      <button onClick={() => togglePopup(actividades._id)}>
                        <div className="flex flex-col items-center justify-center">
                          <img src="images/cuadrado.png" alt="Actividad 1" className="w-full h-auto max-w-md rounded-lg shadow-md col-span-2" />
                          <div className="text-center col-span-2">
                            <h2 className="text-xl font-bold">{actividades.asunto}</h2>
                            <p className="text-gray-700">{actividades.objetivo}</p>
                          </div>
                        </div>
                      </button>
                      {showPopup === actividades._id && <Actividad handleClose={() => togglePopup(actividades._id)} show={showPopup} id={actividades._id} />}
                    </div>
                  </li>
              ))}



              </>
            )}

            {contenidoVisible === "Texto 2" && (
              <>
                {Array.isArray(actividadesAlum) && actividadesAlum.map((actividades) => (
                  <li key={actividades._id} className="list-none p-2 mb-4 bg-gray-200 rounded-lg shadow-md grid-cols-2 gap-4">
                    <div>
                      <button onClick={() => togglePopup(actividades._id)}>
                        <div className="flex flex-col items-center justify-center">
                          <img src="images/cuadrado.png" alt="Actividad 1" className="w-full h-auto max-w-md rounded-lg shadow-md col-span-2" />
                          <div className="text-center col-span-2">
                            <h2 className="text-xl font-bold">{actividades.asunto}</h2>
                            <p className="text-gray-700">{actividades.objetivo}</p>
                          </div>
                        </div>
                      </button>
                      {showPopup === actividades._id && <Actividad handleClose={() => togglePopup(actividades._id)} show={showPopup} id={actividades._id} />}
                    </div>
                  </li>
              ))}
              </>
            )}

            {contenidoVisible === "Texto 3" && (
              <>
                {Array.isArray(actividadesPriv) && actividadesPriv.map((actividades) => (
                  <li key={actividades._id} className="list-none p-2 mb-4 bg-gray-200 rounded-lg shadow-md grid-cols-2 gap-4">
                    <div>
                      <button onClick={() => togglePopup(actividades._id)}>
                        <div className="flex flex-col items-center justify-center">
                          <img src="images/cuadrado.png" alt="Actividad 1" className="w-full h-auto max-w-md rounded-lg shadow-md col-span-2" />
                          <div className="text-center col-span-2">
                            <h2 className="text-xl font-bold">{actividades.asunto}</h2>
                            <p className="text-gray-700">{actividades.objetivo}</p>
                          </div>
                        </div>
                      </button>
                      {showPopup === actividades._id && <Actividad handleClose={() => togglePopup(actividades._id)} show={showPopup} id={actividades._id} />}
                    </div>
                  </li>
              ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actividades;
