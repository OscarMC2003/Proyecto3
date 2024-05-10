"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { createForum } from '@/utils/foros';
import { getUserId } from '@/utils/user'
import Select from 'react-select';


const agregarForo = async (Foro) => {
  try {
    console.log("datos a enviar: ", Foro);
    const data = await createForum(Foro, localStorage.getItem('token'));
    console.log(data);
  } catch (error) {
    console.error('Ocurrió un error al agregar el Foro:', error);
    console.error(error);
  }
};

const CrearForo = () => {
  const [id, setId] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosCargados, setUsuariosCargados] = useState(false);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);

  const toggleUsuario = (usuario) => {
    setUsuariosSeleccionados((prevUsuarios) => {
      const yaSeleccionado = prevUsuarios.find(u => u._id === usuario._id);
      if (yaSeleccionado) {
        return prevUsuarios.filter(u => u._id !== usuario._id);
      } else {
        return [...prevUsuarios, usuario];
      }
    });
  };
  
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/users/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsuarios(data);
      setUsuariosCargados(true);
      console.log('Usuarios cargados:', data);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };


  useEffect(() => {
    (async () => {
      setId(await getUserId(localStorage.getItem('token')));
    })();
    console.log(id)
  }, [id]);

  const handleSelectOpen = () => {
    if (!usuariosCargados) {
      fetchUsuarios();
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setUsuariosSeleccionados(selectedOptions);
  };


  // Estado para almacenar los valores de los campos del formulario
  /*const [formData, setFormData] = useState({
    name: '',
    descripcion: '',
    mensaje: []
  });*/

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const ajustarAltura = (elemento) => {
    elemento.style.height = "auto";
    elemento.style.height = elemento.scrollHeight + "px";
  };

  // Manejador para actualizar el estado basado en la entrada del usuario
  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;
    if (name === 'tipo' || name === 'edificio') {

      setFormData((prevState) => ({
        ...prevState,
        espacio: {
          ...prevState.espacio,
          [name]: value,
        },
      }));
    } else {

      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }



    if (name === "objetivo" || name === "asistentesRequeridos") {
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
    const foro = {
    name: nombre,
    descripcion: descripcion,
    mensaje: []
    }
    
    try {
      console.log("datos a enviar: ", foro);
      const data = await createForum(foro, localStorage.getItem('token'));
      console.log(data);
    } catch (error) {
      console.error('Ocurrió un error al agregar la actividad:', error);
      console.error(error);
    }
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
        <img src="/images/Logo U-Tad.png" alt="Imagen Izquierda" style={{ width: '75px', height: 'auto' }} />
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
              <img src={imagePreviewUrl} alt="Vista previa del foro" className="w-full mb-4 max-h-60 object-cover" />
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
              {/* Left column for Forum description */}
              <div className="flex-grow w-2/3">

                {/*nombre del foro */}
                <label htmlFor="asunto" className="text-2xl block mb-2 font-bold montBlack">Nombre del foro{
                  
                }</label>
                <input
                  type="text"
                  nombre="nombre"
                  id="nombre"
                  onChange={(e) => setNombre(e.target.value)}
                  className="border p-2 w-full"
                />

                {/*objetivo del foro */}
                <label htmlFor="objetivo" className="block mt-5 mb-2 font-bold montBlack">Descripcion</label>
                <textarea
                  name="descripcion"
                  id="descripcion"
                  onChange={(e) => setDescripcion(e.target.value)}
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
                    <img src="/images/cuadrado.png" alt="Foro" className="w-auto"></img>
                    <img src="/images/cuadrado.png" alt="Foro" className="w-auto"></img>
                  </div>

                </div>

              </div>

              {/* Right column for date, location, and attendees */}

              <div className="w-full md:w-1/3 pt-4 md:pt-0 md:pl-6  flex flex-col items-center justify-center">

                <div className="flex flex-col mb-4">

                  {/*Fecha del foro */}
                  <label htmlFor="fecha" className="block mb-2 font-bold ">Fecha</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    className="border p-2 w-full"
                  />

                  {/*Hora del foro */}
                  <label htmlFor="hora" className="block mb-2 font-bold ">Hora</label>
                  <input
                    type="time"
                    id="hora"
                    name="hora"
                    className="border p-2 w-full"
                  />

                  {/*espacio del foro */}

                  {/*espacio del foro */}
                  <label htmlFor="tipoespacio" className="block mb-2 font-bold  ">Tipo de espacio</label>
                  <select
                    id="tipoespacio"
                    name="tipoespacio"
                    className="border p-2 w-full"
                  >
                    <option value="">Seleccionar</option>
                    <option value="fisico">Físico</option>
                    <option value="virtual">Virtual</option>
                  </select>


                  {/*Asistentes Confirmado 
                                -----------
                                ||REVISAR||
                                -----------
                        */}
                  <div className="container mx-auto p-4">
                    <div className="mt-4">
                      <label className="block mb-2 font-bold ">Asistentes Requeridos</label>
                      <div className="mt-1 relative">
                        <Select
                          isMulti
                          options={usuarios.map(user => ({ value: user._id, label: user.name }))}
                          value={usuariosSeleccionados}
                          onMenuOpen={handleSelectOpen}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          closeMenuOnSelect={false}
                        />
                      </div>
                      
                    </div>

                    <div className='flex w-auto justify-center'>
                      <button type="submit" className="mt-5 bg-blue-600 text-white py-4 px-10 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                        Crear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};


export default CrearForo;
