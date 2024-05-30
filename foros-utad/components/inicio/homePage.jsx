"use client"
//import { useState } from 'react';
import { useEffect, useState } from 'react';
//import Login from '../login/login'; // Asegúrate de que la ruta de importación es correcta
import Carousel from './carrusel';
import Link from 'next/link'

// components/inicio.jsx
function Inicio() {
  //const [showLogin, setShowLogin] = useState(false);

  const imageUrls = [
    '/images/portada1.jpg',
    '/images/portada2.png',
    '/images/portada3.jpg'
  ];

  return (
    <div className="font-sans flex flex-row max-h-screen">
      {/* Contenido de la izquierda incluyendo header y footer */}
      <div className="w-1/2 flex flex-col">
  
        <header className="bg-gray-100 p-4 text-center ">
          <img src="/images/Logo U-Tad Login.png" alt="Logo de U-Tad" className="h-12" />
        </header>
  
        <main className="flex-grow flex flex-col justify-center p-4 text-center">
          <h1 className="text-xl font-bold flex mb-10 montBlack2">Bienvenido a la comunidad de U-Tad</h1>
          <p className="mb-2 montRegular">Un espacio por y para los alumnos para compartir, participar y promover</p>
          <p className="mb-8 montRegular">la participación en actividades durante tu vida universitaria.</p>
          <div className="flex justify-center"> {/* Contenedor para centrar el botón */}
          <Link href="/login">
                  <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mt-20">
                      Iniciar sesión
                  </button>
              </Link>
          </div>
        </main>
  
        <footer className="bg-gray-100 p-4 text-center flex justify-between">
  
        <div>
            <a href="#" className="text-blue-600 hover:underline mx-2">Sobre U-Tad</a>
        </div>
        <div>
            <a href="#" className="text-blue-600 hover:underline mx-2">Política de cookies</a>
            <span>|</span>
            <a href="#" className="text-blue-600 hover:underline mx-2">Política de privacidad</a>
        </div>
  
        </footer>
      </div>
  
      {/* Carrusel de fotos en la mitad derecha */}
      <div class="w-1/2 flex flex-col max-h-full">
        <Carousel images={imageUrls} />
      </div>
  
    </div>
  );
}

export default Inicio;

