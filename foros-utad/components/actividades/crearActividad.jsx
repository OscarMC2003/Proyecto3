"use client"
import React, { useState } from 'react';
import { createActivity } from '@/utils/actividades';


const agregarActividad = async (actividad) => {
  try {
    console.log("datos a enviar: ", actividad)
    const data = await createActivity(actividad);
    console.log(data)

  } catch (error) {
    console.error('Ocurrió un error al agregar la actividad:', error);
    console.error(error);
  }
};

const CrearActividad = () => {
  // Estado para almacenar los valores de los campos del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    lugar: '',
    asistentesRequeridos: '',
    asistentesOpcionales: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const ajustarAltura = (elemento) => {
    elemento.style.height = "auto";
    elemento.style.height = elemento.scrollHeight + "px";
  };

  // Manejador para actualizar el estado basado en la entrada del usuario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    console.log("Valores actualizados de formData:", formData);

    if (name === "descripcion" || name === "asistentesRequeridos") {
      ajustarAltura(e.target);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  // Manejador para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (selectedImage) {
      formDataToSend.append('imagen', selectedImage);
    }

    // Aquí enviarías formDataToSend a tu API/backend
    console.log("Enviando formulario y archivo de imagen...");
    agregarActividad(formDataToSend);
    // Asume que tienes una función asíncrona para enviar estos datos a tu backend
    // Por ejemplo: await enviarDatos(formDataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-screen">
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: '#888888',
        padding: '10px',
        textAlign: 'center',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <img src="/images/cuadrado.png" alt="Imagen Izquierda" style={{ width: '75px', height: 'auto' }} />
        <div style={{ flex: 1 }}></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={{
            background: 'blue',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}>
            Comunidad de Alumnos
          </button>
          <img src="/images/userVacio.png" alt="Imagen Derecha" style={{ width: '50px', height: 'auto' }} />
        </div>
      </header>
  
      <div className="pt-16 p-20 bg-gray-200  w-full flex-grow">
  
        <div className="max-w-full mx-auto my-12">
  
          {/* Image as a visual header at the top of the content */}
          <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
  
            <label className=" p-6 block mt-5 mb-2 font-bold montBlack">Imagen</label>
            {imagePreviewUrl && (
              <img src={imagePreviewUrl} alt="Vista previa de la actividad" className="w-full mb-4 max-h-60 object-cover" />
            )}
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleImageChange}
              className="border p-2 w-full mb-4"
            />
  
            {/* Content below the image */}
            <div className="bg-white p-6 flex flex-col md:flex-row">
              {/* Left column for activity description */}
              <div className="flex-grow w-2/3">
  
                {/*Titulo de la actividad */}
                <label htmlFor="titulo" className="text-2xl block mb-2 font-bold montBlack">Título de la actividad</label>
                <input
                  type="text"
                  name="titulo"
                  id="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
  
                {/*Descripcion de la actividad */}
                <label htmlFor="descripcion" className="block mt-5 mb-2 font-bold montBlack">Descripción</label>
                <textarea
                  name="descripcion"
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  style={{ overflowY: 'hidden' }}
                ></textarea>
  
                {/*Documentos adjuntos
                                -----------
                                ||REVISAR||
                                -----------
                    */}
  
                <div className="mt-4 border-t pt-4">
                  <h2 className="font-semibold mb-2">Documentos adjuntos:</h2>
  
                  <div className="flex flex-wrap gap-4">
                    <img src="/images/cuadrado.png" alt="Actividad" className="w-auto"></img>
                    <img src="/images/cuadrado.png" alt="Actividad" className="w-auto"></img>
                  </div>
  
                </div>
  
              </div>
  
              {/* Right column for date, location, and attendees */}
  
              <div className="w-full md:w-1/3 pt-4 md:pt-0 md:pl-6  flex flex-col items-center justify-center">
  
                <div className="flex flex-col mb-4">
  
                  {/*Fecha de la actividad */}
                  <label htmlFor="fecha" className="block mb-2 font-bold ">Fecha</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="border p-2 w-full"
                  />
  
                  {/*Hora de la actividad */}
                  <label htmlFor="hora" className="block mb-2 font-bold ">Hora</label>
                  <input
                    type="time"
                    id="hora"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    className="border p-2 w-full"
                  />
  
                  {/*Lugar de la actividad */}
                  <label htmlFor="lugar" className="block mb-2 font-bold  ">Lugar</label>
                  <input
                    type="text"
                    name="lugar"
                    id="lugar"
                    value={formData.lugar}
                    onChange={handleChange}
                    className="border p-2 w-full"
                  />
  
                  {/*Asistentes Confirmado 
                                -----------
                                ||REVISAR||
                                -----------
                        */}
                  <label htmlFor="asistentesRequeridos" className="block mb-2  font-bold">Asistentes Requeridos</label>
                  <textarea
                    type="text"
                    name="asistentesRequeridos"
                    id="asistentesRequeridos"
                    value={formData.asistentesRequeridos}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    style={{ overflowY: 'hidden' }}
                  />
                  {/*Asistentes Opcionales */}
                  <label htmlFor="asistentesOpcionales" className="block mb-2  font-bold">Asistentes Opcionales</label>
                  <input
                    name="asistentesOpcionales"
                    id="asistentesOpcionales"
                    value={formData.asistentesOpcionales}
                    onChange={handleChange}
                    className="border p-2 w-full"
  
                  />
                </div>
  
                <div className='flex w-auto justify-center'>
                  <button type="submit" className="mt-5  bg-blue-600 text-white py-4 px-10 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
  
};

export default CrearActividad;
