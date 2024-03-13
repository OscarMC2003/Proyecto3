"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Actividades = () => {

  //esto lo tendra que recibir del backend
  const [actividades, setActividades] = useState([]);

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
  const opcionesFecha = ["Fecha 1", "Fecha 2", "Fecha 3"];


  const [contenidoVisible, setContenidoVisible] = useState("Texto 1");


  useEffect(() => {
    const filterActividadCoord = () => {
      //cuando este la base de datos hay que ver que parametro guarda el tipo de actividad que es
      const filteredCoordinacion = actividades.filter((actividades) => actividades.tipo.toLowerCase().includes("coordinacion")
      );
      setActividadesCoord(filteredCoordinacion);
    };

    const filterActividadAlum = () => {
      //cuando este la base de datos hay que ver que parametro guarda el tipo de actividad que es
      const filteredAlumnos = actividades.filter((actividades) => actividades.tipo.toLowerCase().includes("alumnos")
      );
      setActividadesAlum(filteredAlumnos);
    };

    const filterActividadPriv = () => {
      //cuando este la base de datos hay que ver que parametro guarda el tipo de actividad que es
      const filteredPrivadas = actividades.filter((actividades) => actividades.tipo.toLowerCase().includes("privadas")
      );
      setActividadesPriv(filteredPrivadas);
    };

    filterActividadPriv();
    filterActividadAlum();
    filterActividadCoord();
  }, [actividades]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: '#888888', padding: '10px', textAlign: 'center', zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Imagen a la izquierda */}
        <img src="/images/cuadrado.png" alt="Imagen Izquierda" style={{ width: '75px', height: 'auto' }} />

        {/* Contenedor vacío en el centro */}
        <div style={{ flex: 1 }}></div>

        {/* Botón seguido de otra imagen a la derecha */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Comunidad de Alumnos</button>
          <img src="/images/userVacio.png" alt="Imagen Derecha" style={{ width: '50px', height: 'auto' }} />
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
                <ul>
                  {opcionesFecha.map((opcion, index) => (
                    <li key={index}>{opcion}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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
                  <li key={uuidv4()} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
                    <div key={index} style={{ width: '45%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                      <img src={`${actividades.imagen}`} alt={`Actividad ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                      <p className="montRegular" style={{ color: '#333' }}>{actividades.titulo}</p>
                      <p className="montLight" style={{ color: '#333' }}>{actividades.descripcion}</p>
                    </div>
                  </li>
                ))}



              </>
            )}

            {contenidoVisible === "Texto 2" && (
              <>
                {/* {Array.from({ length: 10 }, (_, index) => (
                  <div key={index} style={{ width: '45%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                    <img src="/images/cuadrado.png" alt={`Actividad ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                    <p className="montRegular" style={{ color: '#333' }}>Actividad {index + 1}</p>
                    <p className="montLight" style={{ color: '#333' }}>Código explicativo</p>
                  </div>
                ))}
                <div style={{ width: '45%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                    <img src="/images/cuadrado.png" alt={`Actividad`} style={{ width: '100%', height: 'auto' }} />
                    <p className="montRegular" style={{ color: '#333' }}>Actividad Prueba</p>
                    <p className="montLight" style={{ color: '#333' }}>Texto mas largo que los demas para ver si se ajusta al tamaño de la actividad, para cumplir con los requisitos de los de didi</p>
                  </div> */}

                {Array.isArray(actividadesAlum) && actividadesAlum.map((actividades) => (
                    <li key={uuidv4()} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
                      <div key={index} style={{ width: '45%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                        <img src={`${actividades.imagen}`} alt={`Actividad ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                        <p className="montRegular" style={{ color: '#333' }}>{actividades.titulo}</p>
                        <p className="montLight" style={{ color: '#333' }}>{actividades.descripcion}</p>
                      </div>
                    </li>
                  ))}
              </>
            )}

            {contenidoVisible === "Texto 3" && (
              <>
                {/* {Array.from({ length: 10 }, (_, index) => (
                  <div key={index} style={{ width: '45%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                    <img src="/images/cuadrado.png" alt={`Actividad ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                    <p className="montRegular" style={{ color: '#333' }}>Actividad {index + 1}</p>
                    <p className="montLight" style={{ color: '#333' }}>Código explicativo</p>
                  </div>
                ))} */}


                {Array.isArray(actividadesPriv) && actividadesPriv.map((actividades) => (
                  <li key={uuidv4()} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
                    <div key={index} style={{ width: '45%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                      <img src={`${actividades.imagen}`} alt={`Actividad ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                      <p className="montRegular" style={{ color: '#333' }}>{actividades.titulo}</p>
                      <p className="montLight" style={{ color: '#333' }}>{actividades.descripcion}</p>
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
