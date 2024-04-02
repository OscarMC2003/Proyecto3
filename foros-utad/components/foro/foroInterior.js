"use client"
import React, { useState } from 'react';

function ForoInterior({ handleClose, show, id }) {

    // Estados para manejar la visibilidad de las opciones
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, newMessage]);
            setNewMessage('');
        }
    };

    const showHideClassName = show ? "fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 overflow-y-auto" : "hidden";
    const animationClassName = show ? "animated-fadeIn" : "animated-fadeOut";

    const handleCloseOutside = (event) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    return (
        <>
            <div className={`${showHideClassName} ${animationClassName}`} onClick={handleCloseOutside}>
                <div className="bg-opacity-25 p-8 rounded shadow-lg min-w-[300px] max-w-screen-lg w-full h-screen my-8 mx-auto flex flex-col justify-between" style={{marginTop: '20vh'}}> {/* Ajustes en el contenedor principal */}
                    <div className="bg-white p-6 flex flex-col md:flex-row flex-1 overflow-y-auto rounded"> {/* Agregado redondeo a los bordes */}
                        <div className="flex flex-col h-full w-full"> {/* Ajustado para ocupar todo el ancho */}
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
    )
}

export default ForoInterior;
