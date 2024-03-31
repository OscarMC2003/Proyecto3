"use client"
import React, { useState } from 'react';
import check_token from '../notoken_redirect/notoken_redirect'

function ForoInterior() {

    // Estados para manejar la visibilidad de las opciones
    const [chatGeneral, setChatGeneral] = useState(false);

    // Opciones para cada categoría
    const opcionesChatGeneral = ["Dudas", "4ºA", "3ºB"];

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
        setMessages([...messages, newMessage]);
        setNewMessage('');
        }
    };
   
  
    return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: '#888888', padding: '10px', textAlign: 'center', zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Imagen a la izquierda */}
            <img src="/images/cuadrado.png" alt="Imagen Izquierda" style={{ width: '75px', height: 'auto' }} />

            {/* Contenedor vacío en el centro */}
            <div style={{ flex: 1 }}></div>

            {/* Botón seguido de otra imagen a la derecha */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <button style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Actividades</button>
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
                {/* Cuadro centrado para "Filtrar por:" y opciones */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', background: '#eee', width: "70%", marginLeft: '15%', marginTop: '5%' }}>
                    <div style={{ margin: '10px 0' }}>
                        <p className="montRegular" style={{ cursor: 'pointer', color: 'black' }} onClick={() => setChatGeneral(!chatGeneral)}>Chat general</p>
                        {chatGeneral && (
                            <ul>
                            {opcionesChatGeneral.map((opcion, index) => (
                                <li key={index}>{opcion}</li>
                            ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Contenido de la segunda parte (pegado a la derecha) */}
            <div style={{ flex: '1', padding: '20px', background: '#eee', top: '50px', bottom: 0, width: '70%', position: 'fixed', left: '30%', overflow: 'auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }} className="border-b-2 border-black">
                            {/* meter iconos */}
                    <p className="montBlack mt-4 mb-7" >Coordinación</p>
                </div>


                <div className="flex flex-col h-screen">
                    <div className="flex-1 overflow-y-auto">
                        {messages.map((message, index) => (
                        <div key={index} className="p-2">
                            <div className="bg-gray-200 p-2 rounded-lg inline-block">
                            {message}
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="flex p-2">
                        <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 border border-gray-300 rounded-l-md p-2"
                        />
                        <button
                        onClick={handleSendMessage}
                        className="bg-gray-800 text-white px-4 py-2 rounded-r-md"
                        >
                        Enviar
                        </button>
                    </div>
                </div>


            </div>
        </div>
    </div>
    </>
    );
  }
  
  export default ForoInterior;
  
  
