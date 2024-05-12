"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import user from '../notoken_redirect/notoken_redirect'
import Actividad from "@/components/actividades/actividad"; // Mantener la importación del componente Actividad
import CrearActividad from '@/components/actividades/crearActividad';

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
  const [showCrearActividadPopup, setShowCrearActividadPopup] = useState(false);

  //Gestion aleatoria de imagenes

  const imageUrls = [
    "/images/actividades/base1.jpeg",
    "/images/actividades/base2.jpeg",
    "/images/actividades/base3.jpeg",
    "/images/actividades/base4.jpeg",
    "/images/actividades/base5.jpeg",
    
  ];
  
  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };

  const togglePopup = (actividadId) => {
    setShowPopup(actividadId === showPopup ? null : actividadId);
  };

  
  const togglePopupCrearActividad = () => {
    setShowCrearActividadPopup(!showCrearActividadPopup);
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

        const enrichedData = data.map(actividad => ({
          ...actividad,
          imageUrl: getRandomImageUrl(), // Añadir una URL de imagen aleatoria
        }));

        setActividades(enrichedData);
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

  const handleCambioAInicio = () =>{
    router.push(`/`);
  }

  const handleCrearActividad = () => {
    router.push(`/crearActividad?id=${IdUserIniciado}`);
  };

  /*const handleIrActividad = (identificadorActividad) =>{
    router.push(`/actividad?id=${IdUserIniciado}&acti=${identificadorActividad}`)
      
  }*/

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      <header className="fixed top-0 left-0 w-full h-20 bg-gray-300 p-2.5 text-center z-10 flex justify-between items-center" style={{background: '#0a1229'}}>

        <button onClick={handleCambioAInicio} type="button" class="w-13 h-12 flex items-center justify-center rounded-md ">
          <img src="/images/Logo U-Tad.png" alt="Imagen Izquierda" class="w-full h-full object-cover " />
        </button>

          {/* Contenedor vacío en el centro */}
          <div className="flex-1"></div>

          {/* Botón seguido de otra imagen a la derecha */}
          <div className="flex items-center">

            <button className="bg-blue-600 text-white p-2.5 rounded cursor-pointer mr-2.5">Actividades</button>
            <button onClick={handleCambioAForos} className="bg-blue-500 hover:bg-blue-700 text-white p-2.5 rounded cursor-pointer mr-2.5 transition duration-300 ease-in-out">Comunidad de Alumnos</button>
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
        <div style={{zIndex:'10', marginTop:'20px',flex: '0 0 30%', padding: '20px', background: 'white', marginLeft: 0, position: 'fixed', left: 0, top: '60px', bottom: 0, width: '30%', justifyContent:'center' }}>
        <h1 className="montExtra text-center ">Actividades</h1>
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
            
          </div >

          <div className='flex justify-center items-center'>
              <button onClick={togglePopupCrearActividad} className="mt-20  bg-blue-500 hover:bg-blue-700 text-white p-2.5 rounded cursor-pointer mr-2.5 transition duration-300 ease-in-out">Crear Actividad</button>
              {setShowCrearActividadPopup && <CrearActividad handleClose={() => togglePopupCrearActividad()} show={showCrearActividadPopup} />}
          </div>
        </div>

        {/* Contenido de la segunda parte (pegado a la derecha) */}
        <div style={{marginTop:'20px', flex: '1', padding: '20px', background: '#eee', top: '50px', bottom: 0, width: '70%', position: 'fixed', left: '30%', overflow: 'auto' }}>
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



              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {Array.isArray(actividadesCoord) && actividadesCoord.map((actividades) => (

                  <li key={actividades._id} className="flex flex-col justify-between list-none p-2 bg-gray-200 rounded-lg shadow-md h-auto md:h-64">
                      {console.log("ID de la actividad:", actividades._id)}
                    <button onClick={() => togglePopup(actividades._id)} className="flex flex-col items-center justify-center w-full h-full">

                      <img src={actividades.imageUrl} alt="Actividad 1" className="w-full h-32 object-cover rounded-lg shadow-md" />

                      <div className="text-center mt-2 px-2">
                        <h2 className="text-xl font-bold line-clamp-1">{actividades.asunto}</h2>
                        <p className="text-gray-700 text-sm mt-3 line-clamp-3 h-14">{actividades.objetivo}</p>
                      </div>

                    </button>

                    {showPopup === actividades._id && <Actividad handleClose={() => togglePopup(actividades._id)} show={showPopup} id={actividades._id} />}
                  
                  </li>
              ))}
              </div>


              </>
            )}

            {contenidoVisible === "Texto 2" && (
              <>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(actividadesAlum) && actividadesAlum.map((actividades) => (
                  <li key={actividades._id} className="flex flex-col justify-between list-none p-2 bg-gray-200 rounded-lg shadow-md h-auto md:h-64">

                  <button onClick={() => togglePopup(actividades._id)} className="flex flex-col items-center justify-center w-full h-full">

                    <img src="images/cuadrado.png" alt="Actividad 1" className="w-full h-32 object-cover rounded-lg shadow-md" />

                    <div className="text-center mt-2 px-2">
                      <h2 className="text-xl font-bold line-clamp-1">{actividades.asunto}</h2>
                      <p className="text-gray-700 text-sm mt-3 line-clamp-3 h-14">{actividades.objetivo}</p>
                    </div>

                  </button>

                  {showPopup === actividades._id && <Actividad handleClose={() => togglePopup(actividades._id)} show={showPopup} id={actividades._id} />}

                </li>
              ))}
              </div>
              </>
            )}

            {contenidoVisible === "Texto 3" && (
              <>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(actividadesPriv) && actividadesPriv.map((actividades) => (
                  <li key={actividades._id} className="flex flex-col justify-between list-none p-2 bg-gray-200 rounded-lg shadow-md h-auto md:h-64">

                  <button onClick={() => togglePopup(actividades._id)} className="flex flex-col items-center justify-center w-full h-full">

                    <img src="images/cuadrado.png" alt="Actividad 1" className="w-full h-32 object-cover rounded-lg shadow-md" />

                    <div className="text-center mt-2 px-2">
                      <h2 className="text-xl font-bold line-clamp-1">{actividades.asunto}</h2>
                      <p className="text-gray-700 text-sm mt-3 line-clamp-3 h-14">{actividades.objetivo}</p>
                    </div>

                  </button>

                  {showPopup === actividades._id && <Actividad handleClose={() => togglePopup(actividades._id)} show={showPopup} id={actividades._id} />}

                </li>
              ))}
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actividades;
