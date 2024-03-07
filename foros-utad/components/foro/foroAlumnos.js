"use client"
import React, { useState } from 'react';
import Buscador from '../buscador/buscador'
import Lista from '../lista/lista'

const Actividades = () => {
    // Estados para manejar la visibilidad de las opciones
    const [mostrarTitulacion, setMostrarTitulacion] = useState(false);
    const [mostrarCurso, setMostrarCurso] = useState(false);
    const [mostrarGrupo, setMostrarGrupo] = useState(false);
    const [mostrarMiembros, setMostrarMiembros] = useState(false);
    const [mostrarFecha, setMostrarFecha] = useState(false);
    const [mostrarTemas, setMostrarTemas] = useState(false);

    // Opciones para cada categoría
    const opcionesTitulacion = ["Opción 1", "Opción 2", "Opción 3"];
    const opcionesCurso = ["Opción A", "Opción B", "Opción C"];
    const opcionesGrupo = ["Grupo 1", "Grupo 2", "Grupo 3"];
    const opcionesMiembros = ["Miembro 1", "Miembro 2", "Miembro 3"];
    const opcionesFecha = ["Fecha 1", "Fecha 2", "Fecha 3"];
    const opcionesTemas = ["Tema 1", "Tema 2", "Tema 3"];

    const [contenidoVisible, setContenidoVisible] = useState("Texto 1");

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
                    <h1 className="montExtra">Comunidad de alumnos</h1>
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
                            <p className="montRegular" style={{ cursor: 'pointer', color: 'black' }} onClick={() => setMostrarMiembros(!mostrarMiembros)}>Miembros</p>
                            {mostrarMiembros && (
                                <ul>
                                    {opcionesMiembros.map((opcion, index) => (
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

                        <div style={{ margin: '10px 0' }}>
                            <p className="montRegular" style={{ cursor: 'pointer', color: 'black' }} onClick={() => setMostrarTemas(!mostrarTemas)}>Temas</p>
                            {mostrarTemas && (
                                <ul>
                                    {opcionesTemas.map((opcion, index) => (
                                        <li key={index}>{opcion}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contenido de la segunda parte (pegado a la derecha) */}
                <div style={{ flex: '1', padding: '20px', background: '#eee', top: '50px', bottom: 0, width: '70%', position: 'fixed', left: '30%', overflow: 'auto' }}>

                    <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px', justifyContent: 'space-around' }}>
                        <Buscador />
                    </div>

                    <div style={{
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'black',
                        marginTop: '10px',
                    }} />     
                    
                    <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }}>
                        <p className="montBlack" style={{ cursor: 'pointer', color: contenidoVisible === "Texto 1" ? 'black' : 'black', textDecoration: contenidoVisible === "Texto 1" ? 'underline' : 'none' }} onClick={() => setContenidoVisible("Texto 1")}>Tus foros</p>
                        <p className="montBlack" style={{ cursor: 'pointer', color: contenidoVisible === "Texto 2" ? 'black' : 'black', textDecoration: contenidoVisible === "Texto 2" ? 'underline' : 'none' }} onClick={() => setContenidoVisible("Texto 2")}>Nuevos foros</p>          </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        {/* Estructura para mostrar actividades */}
                        <Lista/>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Actividades;
