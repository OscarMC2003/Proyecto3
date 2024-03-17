"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'



async function loginHandler(user, router) {

    console.log(user); // Debería mostrarte la estructura del objeto

    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            router.push('/actividades');
        } else {
            console.error('Respuesta no exitosa del servidor');
            const text = await response.text(); // Esto te dará el cuerpo de la respuesta
            console.error(text); // Puede ayudarte a entender qué HTML se está recibiendo
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        if (error.response) {
            console.error('La respuesta del error es:', await error.response.text());
        }

    }
}
export default function Login() {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        }
        // alert(user.email)
        //alert(user.password)

        loginHandler(user, router);

        //LLamadas a base de datod
        //pedir si usuario exisiste
        //obetenr contraseña
        //comparar con la dada
        //en caso de que sea correcto inicia sesion como usuario
        //caso contrario, manda mesaje de contraseña errornea o usuario no valido
        //(mirar modos de mostar el error de forma ams graficamente agradable que con un alert)
    }


    return (
        <>
            <div className="container mx-auto">
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <div className="flex justify-center mb-5">
                            <img src="/images/cuadrado.png" alt="Cuadrado DEFAULT" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold flex justify-center mb-10 montBlack">Iniciar sesión</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email de U-Tad</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="shadow-sm border-gray-300 rounded-md w-full py-2 px-4  bg-gray-100" placeholder="ejemplo@live.u-tad.com" />
                            </div>
                            <div className="mb-4 flex items-start">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium">Contraseña</label>
                                <div className="ml-3">
                                    {/* Introducir Link a sitio de recuperacion de contraseña */}
                                    <Link href="https://www.youtube.com/" className="montLight">¿Has olvidado tu contraseña?</Link>
                                </div>
                            </div>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="shadow-sm border-gray-300 rounded-md w-full py-2 px-4 mb-8 bg-gray-100" placeholder="••••••••" />
                            <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md w-full">Iniciar sesión</button>
                        </form>
                        <div className="mt-10 flex justify-center">
                            {/* Introducir link de sitio de ayuda */}
                            <p className="montLight">¿Necesitas ayuda? <Link href="https://www.youtube.com/" className="text-blue-500 hover:underline letraPeque">Escríbenos</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
