"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


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
        alert(user.email)
        alert(user.password)

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
    <div class="container mx-auto">
        <div class="flex flex-col justify-center items-center h-screen">
            <div class="bg-white shadow-md rounded-lg p-8">
                <div class="flex justify-center mb-5">
                    <img src="/images/cuadrado.png" alt="Cuadrado DEFAULT"></img>
                </div>
                
                <div class>
                    <h1 class="text-2xl font-bold flex justify-center mb-10 montBlack">Iniciar sesión</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label for="email" class="block mb-2 text-sm font-medium">Email de U-Tad</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" name="email"class="shadow-sm border-gray-300 rounded-md w-full py-2 px-4  bg-gray-100" placeholder="ejemplo@live.u-tad.com"></input>
                    </div>
                    <div class="mb-4 flex items-start">
                        <label for="password" class="block mb-2 text-sm font-medium">Contraseña</label>
                        <div class="ml-3">
                            {/* Introducir Link a sitio de recuperacion de contraseña */}
                            <Link href="https://www.youtube.com/" class="montLight">¿Has olvidado tu contraseña?</Link>
                        </div>
                    </div>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" class="shadow-sm border-gray-300 rounded-md w-full py-2 px-4 mb-8 bg-gray-100" placeholder="••••••••"></input>
                    <button type="submit" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md w-full">Iniciar sesión</button>
                </form>
                <div class="mt-10 flex justify-center">
                    {/* Introducir link de sitio de ayuda */}
                    <p class="montLight">¿Necesitas ayuda? <Link href="https://www.youtube.com/" class="text-blue-500 hover:underline letraPeque">Escríbenos</Link></p>
                </div>
            </div>
        </div>
    </div>
       </>
    )
}