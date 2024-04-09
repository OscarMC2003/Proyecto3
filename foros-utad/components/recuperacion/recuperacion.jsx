"use client"
import React from 'react';
import { useState } from 'react'
import emailjs from 'emailjs-com';
import { useRouter } from 'next/navigation'

emailjs.init("tMhjTFU6z0YnGjFl3");


const Recuperacion = () => {

    const [email, setEmail] = useState("")

    const [pin, setPin] = useState("")
    const [cod, setCod] = useState(""); 

    const [contrasena, setContrasena] = useState("");
    const [contrasena1, setContrasena1] = useState("");

    const [buttonClicked, setButtonClicked] = useState(false); 
    const [isPinCorrect, setIsPinCorrect] = useState(false);

    const router = useRouter()


    const generateRandomNumber = () => {
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
        return randomNumber.toString();
    };


    async function loginHandler(user) {
        setIsPinCorrect(false);

        //console.log(user); // Debería mostrarte la estructura del objeto
    
        try {
            const response = await fetch(window.location.origin.slice(0, -5) + ':9000/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            //console.log(response);
    
            if (response.status === 401) {
                console.error('Usuario encontrado');
                setButtonClicked(true);
                const cod = generateRandomNumber();
                setCod(cod);
                //console.log(cod);
                //Envio de correo
                emailjs.send("service_qt7fqgj", "template_zjm8jbh", {
                    direccion: email,
                    to_name: email,
                    PIN: cod
                })
                .then(function(response) {
                    console.log("Email sent successfully!", response.status, response.text);
                }, function(error) {
                    console.error("Error sending email:", error);
                });
            } else {
                alert('Usuario no encontrado');
                console.error('Usuario no encontrado');
                setButtonClicked(false);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            if (error.response) {
                console.error('La respuesta del error es:', await error.response.text());
            }
    
        }
    }

    const handleButtonClick = () => {
        
        //console.log(email);

        const user = {
            email: email,
            password: "..........",
        }

        loginHandler(user)
    };

    const handleButtonAceptar = () => {
        //console.log(pin);
        //console.log(cod);
        if (pin === cod) {
            console.log('Pin correcto');
            setIsPinCorrect(true);
            setButtonClicked(false);
        } else {
            alert('Pin incorrecto');
            setIsPinCorrect(false);
        }
    }

    const handleButtonContrasena = () => {
        //console.log(contrasena);
        //console.log(contrasena1);
        if (contrasena === contrasena1) {
            console.log('Contraseña correcta');
            actualizacionContrasena();

        } else {
            alert.log('Contraseñas no coinciden');
        }
        
    }

    const actualizacionContrasena = async () => {
        const encodedEmail = btoa(email);
        //console.log(encodedEmail);
         try {
                const response = await fetch(window.location.origin.slice(0, -5) + `:9000/api/users/${encodedEmail}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({password: contrasena})
                });

                //console.log(response);
        
                if (response.status === 200) {
                    console.error('Contraseña actualizada');
                    alert('Contraseña actualizada');
                    router.push("/login");
                } else {
                    alert('Error al actualizar contraseña');
                    console.error('Error al actualizar contraseña');
                }
            } catch (error) {
                console.error('Error:', error);
            }
    }

    return (
        <div>
            <>
                <div className="container mx-auto">
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <div className="flex justify-center mb-5">
                                <img src="/images/cuadrado.png" alt="Cuadrado DEFAULT" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold flex justify-center mb-10 montBlack">Recuperación contraseña</h1>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email del usuario</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="shadow-sm border-gray-300 rounded-md w-full py-2 px-4  bg-gray-100" placeholder="ejemplo@live.u-tad.com" />
                                <button onClick={handleButtonClick} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md w-full mt-4">
                                    Buscar usuario
                                </button>
                            </div>   
                            {buttonClicked && ( // Sección que solo se muestra si buttonClicked es verdadero
                                <div>
                                    <hr className="my-8" />
                                    <div>
                                        <h1 className="block mb-2 text-sm font-medium">Revise el correo e introduzca el pin que recibió</h1>
                                    </div>
                                    <div>
                                        <input id="password" name="pin" onChange={(e) => setPin(e.target.value)} className="shadow-sm border-gray-300 rounded-md w-full py-2 px-4  bg-gray-100" placeholder="Pin"  maxLength={8} style={{ letterSpacing: '1rem', textAlign: 'center' }}/>
                                        <button onClick={handleButtonAceptar} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md w-full mt-4">
                                            Aceptar
                                        </button>
                                    </div>
                                </div>
                            )}
                            {isPinCorrect && (
                                <div>
                                    <div>
                                        <hr className="my-8" />
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Introduce la nueva contraseña</label>
                                            <input id="password" name="pin" onChange={(e) => setContrasena(e.target.value)} className="shadow-sm border-gray-300 rounded-md w-full py-2 px-4  bg-gray-100" placeholder="Nueva contraseña"/>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium mt-4">Repite la nueva contraseña</label>
                                            <input id="password" name="pin" onChange={(e) => setContrasena1(e.target.value)} className="shadow-sm border-gray-300 rounded-md w-full py-2 px-4  bg-gray-100" placeholder="Nueva contraseña"/>
                                            
                                            <button onClick={handleButtonContrasena} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md w-full mt-4">
                                                Cambiar contraseña
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}                         
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Recuperacion;