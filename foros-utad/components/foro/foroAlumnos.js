"use client"
import React, { useState, useEffect } from 'react';
import Buscador from '../buscador/buscador'
import Lista from '../lista/lista'
import { useRouter } from 'next/navigation'
import user from '../notoken_redirect/notoken_redirect'
import CrearForo from './crearForo';

const Foros = ({ IdUserIniciado, handleClose, show }) => {

    const router = useRouter()
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

    let [foros, setForos] = useState([]);

    const handleCambioAactividades = () => {
        router.push(`/actividades?id=${IdUserIniciado}`);
    }

    const handleCambioAUsuario = () => {
        router.push(`/perfil?id=${IdUserIniciado}`);
    }

    const handleCambioAInicio = () => {
        router.push(`/`);
    }


    const handleCrearForo = () => {
        router.push('/crearForo');
    };

    const [showCrearForo, setShowCrearForo] = useState(false);

    const togglePopupCrearForo = () => {
        setShowCrearForo(!showCrearForo);
    };

    useEffect(() => {
        async function LlamadaForos() {
            try {
                const token = localStorage.getItem('token')
                console.log(token);
                const options = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                const response = await fetch(window.location.origin.slice(0, -5) + ':9000/api/foro', options);
                setForos(await response.json())
            } catch (error) {
                console.log("Error al llamar a las actividades")
            }
        }


        LlamadaForos()
    }, [foros]);

    const handleCambiaActividades = () => {
        router.push(`/actividades?id=${IdUserIniciado}`);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

            <header className="fixed top-0 left-0 w-full h-20 bg-gray-300 p-2.5 text-center z-10 flex justify-between items-center" style={{ background: '#0a1229' }}>

                <button onClick={handleCambioAInicio} type="button" class="w-13 h-12 flex items-center justify-center rounded-md">
                    <img src="/images/Logo U-Tad.png" alt="Imagen Izquierda" class="w-full h-full object-cover " />
                </button>

                {/* Contenedor vacío en el centro */}
                <div className="flex-1"></div>

                {/* Botón seguido de otra imagen a la derecha */}
                <div className="flex items-center">
                    <button onClick={handleCambioAactividades} className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-text-white hover:border-transparent rounded">Actividades</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2.5 ml-3">Comunidad de Alumnos</button>
                    <button onClick={handleCambioAUsuario} className="ml-2.5">
                        <img src="/images/userVacio.png" alt="Imagen Derecha" className="w-12 h-auto rounded-full border-2 border-blue-700" />
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
                <div style={{ marginTop: '20px', flex: '0 0 30%', padding: '20px', background: 'white', marginLeft: 0, position: 'fixed', left: 0, top: '60px', bottom: 0, width: '30%' }}>
                    <h1 className="montExtra text-center ">Comunidad de Alumnos</h1>
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

                    <div className='flex justify-center items-center'>
                        <button onClick={togglePopupCrearForo} className="mt-20  bg-blue-500 hover:bg-blue-700 text-white p-2.5 rounded cursor-pointer mr-2.5 transition duration-300 ease-in-out">Crear foro</button>
                        {showCrearForo && <CrearForo handleClose={() => togglePopupCrearForo()} show={showCrearForo} />}
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
                        <Lista foros={foros} idUserIniciado={IdUserIniciado} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Foros;