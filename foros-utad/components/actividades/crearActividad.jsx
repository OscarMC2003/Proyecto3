"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { createActivity } from '@/utils/actividades';
import { getUserId } from '@/utils/user'
import Select from 'react-select';


const agregarActividad = async (actividad) => {
  try {
    console.log("datos a enviar: ", actividad);
    const data = await createActivity(actividad, localStorage.getItem('token'));
    console.log(data);
  } catch (error) {
    console.error('Ocurrió un error al agregar la actividad:', error);
    console.error(error);
  }
};



const CrearActividad = () => {
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
  //(callBack)devuelve una versión memorizada de una función que solo cambia si una de las dependencias ha cambiado
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



  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      idCreador: id
    }));
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
  const [formData, setFormData] = useState({
    idCreador: id,
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    lugar: { tipo: '', edificio: '' },
    asistentesRequeridos: [],
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
    const { name, value, selectedOptions } = e.target;
    if (name === 'tipo' || name === 'edificio') {

      setFormData((prevState) => ({
        ...prevState,
        lugar: {
          ...prevState.lugar,
          [name]: value,
        },
      }));
    } else {

      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }



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
    const actividad = {
      ...formData,
      asistentesRequeridos: usuariosSeleccionados.map(user => user)
    };
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (formData.lugar.tipo === 'virtual') {
      setFormData(prevState => ({
        ...prevState,
        lugar: {
          ...prevState.lugar,
          edificio: '' // Establecer el edificio como una cadena vacía
        }
      }));
    }
    // Aquí enviarías formDataToSend a tu API/backend
    console.log("Enviando formulario y archivo de imagen...");

    //no he usado 
    agregarActividad(actividad);
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

                  {/*Lugar de la actividad */}
                  <label htmlFor="tipoLugar" className="block mb-2 font-bold  ">Tipo de Lugar</label>
                  <select
                    id="tipoLugar"
                    name="tipoLugar"
                    value={formData.lugar.tipo}
                    onChange={(e) => setFormData(prevState => ({
                      ...prevState,
                      lugar: {
                        ...prevState.lugar,
                        tipo: e.target.value
                      }
                    }))}
                    className="border p-2 w-full"
                  >
                    <option value="">Seleccionar</option>
                    <option value="fisico">Físico</option>
                    <option value="virtual">Virtual</option>
                  </select>

                  {/*Edificio de la actividad */}
                  {formData.lugar.tipo === 'fisico' && (
                    <div>
                      <label htmlFor="edificio" className="block mb-2 font-bold  ">Edificio</label>
                      <select
                        id="edificio"
                        name="edificio"
                        value={formData.lugar.edificio}
                        onChange={(e) => setFormData(prevState => ({
                          ...prevState,
                          lugar: {
                            ...prevState.lugar,
                            edificio: e.target.value
                          }
                        }))}
                        className="border p-2 w-full"
                      >
                        <option value="">Seleccionar</option>
                        <option value="madrid">Madrid</option>
                        <option value="berlin">Berlín</option>
                        <option value="londres">Londres</option>
                      </select>
                    </div>
                  )}


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
                          onChange={handleSelectChange}
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


export default CrearActividad;
