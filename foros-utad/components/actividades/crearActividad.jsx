"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { createActivity } from '@/utils/actividades';
import { getUserId } from '@/utils/user'
import Select from 'react-select';
import Portal from '@/utils/portal';


const agregarActividad = async (actividad, handleClose) => {
  try {
    console.log("datos a enviar: ", actividad);
    const data = await createActivity(actividad, localStorage.getItem('token'));
    console.log(data);
    handleClose();
    window.location.reload();
  } catch (error) {
    console.error('Ocurrió un error al agregar la actividad:', error);
    console.error(error);
  }
  alert('Actividad creada exitosamente')
};

const CrearActividad = ({handleClose, show}) => {

  if (!show) return null;

  const showHideClassName = show ? "fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 overflow-y-auto z-20" : "hidden";
  const animationClassName = show ? "animated-fadeIn" : "animated-fadeOut";
  const showHideCrearActividad = show ? " fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 overflow-y-auto" : "hidden";


  const [id, setId] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosCargados, setUsuariosCargados] = useState(false);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);

  const handleCloseOutside = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  

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
    asunto: '',
    objetivo: '',
    tipoActividad: 'coordinacion',
    fecha: '',
    hora: '',
    espacio: { tipo: '', edificio: '' },
    asistentesRequeridos: [],
    asistentesOpcionales: [],
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
    const actividad = {
      ...formData,
      asistentesRequeridos: usuariosSeleccionados.map(user => user)
    };
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (formData.espacio.tipo === 'virtual') {
      setFormData(prevState => ({
        ...prevState,
        espacio: {
          ...prevState.espacio,
          edificio: '' // Establecer el edificio como una cadena vacía
        }
      }));
    }
    // Aquí enviarías formDataToSend a tu API/backend
    console.log("Enviando formulario y archivo de imagen...");

    //no he usado 
    agregarActividad(actividad,handleClose);
    // Asume que tienes una función asíncrona para enviar estos datos a tu backend
    // Por ejemplo: await enviarDatos(formDataToSend);
  };

  return (
    <Portal>
      <div className={`${showHideClassName} ${animationClassName} `} onClick={handleCloseOutside}>
        <form onSubmit={handleSubmit} className="flex flex-col h-screen">

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

                    {/*asunto de la actividad */}
                    <label htmlFor="asunto" className="text-2xl block mb-2 font-bold montBlack">Asunto de la actividad</label>
                    <input
                      type="text"
                      name="asunto"
                      id="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      className="border p-2 w-full"
                    />

                    {/*objetivo de la actividad */}
                    <label htmlFor="objetivo" className="block mt-5 mb-2 font-bold montBlack">Objetivo</label>
                    <textarea
                      name="objetivo"
                      id="objetivo"
                      value={formData.objetivo}
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

                      {/*espacio de la actividad */}

                      {/*espacio de la actividad */}
                      <label htmlFor="tipoespacio" className="block mb-2 font-bold  ">Tipo de espacio</label>
                      <select
                        id="tipoespacio"
                        name="tipoespacio"
                        value={formData.espacio.tipo}
                        onChange={(e) => setFormData(prevState => ({
                          ...prevState,
                          espacio: {
                            ...prevState.espacio,
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
                      {formData.espacio.tipo === 'fisico' && (
                        <div>
                          <label htmlFor="edificio" className="block mb-2 font-bold  ">Edificio</label>
                          <select
                            id="edificio"
                            name="edificio"
                            value={formData.espacio.edificio}
                            onChange={(e) => setFormData(prevState => ({
                              ...prevState,
                              espacio: {
                                ...prevState.espacio,
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
        </form>
      </div>
    </Portal>
  );
};


export default CrearActividad;
