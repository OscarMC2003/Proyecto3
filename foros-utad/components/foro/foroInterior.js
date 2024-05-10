"use client"
import React, { useState, useEffect } from 'react';
import user from '../notoken_redirect/notoken_redirect'
import { useRouter } from 'next/navigation'

function ForoInterior({IDs}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [foro, setForo] = useState({});
    const router = useRouter()

    const handleCambioActividades = () =>{
        router.push(`/actividades?id=${IDs.identificadorUser}`);
      }
    
      const handleCambioAForos = () =>{
        router.push(`/foroAlumnos?id=${IDs.identificadorUser}`);
      }
    
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        console.log("id user" + IDs.identificadorUser)
        console.log("id foro" + IDs.identificadorForo)
        const getMensajes = async () => {
            try {
                const respuesta = await fetch(`http://localhost:9000/api/foro/${IDs.identificadorForo}/mensajes`, options);
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
            getMensajes();
        }, 1000);

        
            getMensajes();
        

        return () => clearInterval(intervalo)
    }, [IDs.identificadorUser, IDs.identificadorForo]);

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
            const response = await fetch(`${window.location.origin.slice(0, -5)}:9000/api/foro/${IDs.identificadorForo}`, options); // Corregir la construcción de la URL
            const data = await response.json();
            setForo(data);
          } catch (error) {
            console.log("Error al llamar a las actividades:", error);
          }
        };
    
        fetchData();
      }, [IDs.identificadorForo]);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            try {
                const token = localStorage.getItem('token')
                const respuesta = await fetch(`http://localhost:9000/api/foro/${IDs.identificadorForo}/mensaje`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        mensaje: {
                            idUsuario: [IDs.identificadorUser],
                            texto: newMessage
                        }
                    })
                });
                if (respuesta.ok) {
                    setNewMessage('');
                } else {
                    console.error('Error al enviar el mensaje:', respuesta.statusText);
                }
            } catch (error) {
                console.error('Error al enviar el mensaje', error);
            }
        }
    };
    

    //const showHideClassName = show ? "fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 overflow-y-auto" : "hidden";
    //const animationClassName = show ? "animated-fadeIn" : "animated-fadeOut";

    /*const handleCloseOutside = (event) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };*/
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: '#0a1229', padding: '10px', textAlign: 'center', zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src="/images/cuadrado.png" alt="Imagen Izquierda" style={{ width: '75px', height: 'auto' }} />
                    <div style={{ flex: 1 }}></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button onClick={handleCambioActividades} style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Actividades</button>
                        <button onClick={handleCambioAForos} style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Comunidad de Alumnos</button>
                    </div>
                </header>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <div style={{ flex: '0 0 30%', padding: '20px', background: 'white', marginLeft: 0, position: 'fixed', left: 0, top: '60px', bottom: 0, width: '30%' }}>
                        <h1 className="montExtra" style={{ textAlign: 'center', marginBottom: '20px' }}>Comunidad de alumnos</h1>
                        <p className="montSEMI2" style={{ color: '#333', textAlign: 'center' }}>{foro.descripcion}</p>
                    </div>
                    
                    <div className="bg-gray-200 rounded min-w-[300px] max-w-screen-lg w-full h-screen my-8 mx-auto flex flex-col justify-between" style={{ marginTop: '20vh', marginLeft: '30%' }}> {/* Ajustes en el contenedor principal */}
                        <div style={{ position: 'sticky', top: 0, zIndex: 1 }}> {/* Hacer el título estático */}
                            <h2 className="text-center text-2xl font-bold py-4 bg-white">{foro.name}</h2> {/* Título con fondo blanco */}
                            <div className="border-t border-gray-400 mt-2"></div> {/* Barra separadora con margen superior */}
                        </div>
                        <div className="bg-white flex flex-col flex-1 overflow-y-auto rounded"> {/* Agregado redondeo a los bordes */}
                            <div className="flex flex-col h-full w-full"> {/* Ajustado para ocupar todo el ancho */}
                                <div className="flex-1 overflow-y-auto">
                                    {messages.map((message, index) => (
                                        <div key={index} className="p-2">
                                            <div className="bg-gray-200 p-2 rounded-lg inline-block">
                                                <span className="backend-message">{message}</span>            
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
            </div>

        </>
    )
}

export default ForoInterior;
