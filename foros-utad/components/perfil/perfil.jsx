"use client";
import React, { useState, useEffect } from 'react';
import user from '../notoken_redirect/notoken_redirect'
import Actividad from "@/components/actividades/actividad"; // Mantener la importación del componente Actividad
import { useRouter } from 'next/navigation'
import fotos from '@/utils/fotos';

const Perfil = ({ IdUserIniciado }) => {

  const [contenidoVisible, setContenidoVisible] = useState("Texto 1");
  const [searchTerm, setSearchTerm] = useState("");

  const [nombre, setNombre] = useState("Nombre de usuario");
  const [texto, setTexto] = useState("Texto de prueba");

  const [mostrarEditarPerfil, setMostrarEditarPerfil] = useState(false);

  const [antibug, setAntibug] = useState(false);

  const [actividad, setActividad] = useState([]);
  const [user, setUser] = useState();

  const router = useRouter()

  

  const filterUser = () => {
    if (user && user.actividades) {
      console.log("usuarios:" + user.actividades);
      console.log("usuarios:" + user.actividades.length);
      for (var i = 0; i < user.actividades.length; i++) {
        fetchDataActividades(i);
      }
      console.log("actividades" + actividad.length);

      setNombre(user.name);
      setTexto(user.email);
    } else {
      console.log("user o user.actividades no están definidos");
    }
  }

  const handleCambioActividades = () => {
    router.push(`/actividades?id=${IdUserIniciado}`);
  }

  const handleCambioAForos = () => {
    router.push(`/foroAlumnos?id=${IdUserIniciado}`);
  }

  const fetchDataActividades = async (i) => {
    try {
      const token = localStorage.getItem('token')
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(`${window.location.origin.slice(0, -5)}:9000/api/actividades/${user.actividades[i]}`, options); // Corregir la construcción de la URL
      const data = await response.json();
      //console.log("actividades" + data.asunto);
      setActividad(prevActividad => [...prevActividad, data]);
      //setActividad(...data);
    } catch (error) {
      console.log("Error al llamar a las actividades:", error);
    }
  };

  useEffect(() => {


    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        const response = await fetch(`${window.location.origin.slice(0, -5)}:9000/api/users/${IdUserIniciado}`, options); // Corregir la construcción de la URL
        const data = await response.json();
        setUser(data);
        //filterUser();
      } catch (error) {
        console.log("Error al llamar a las actividades:", error);
      }
    };
    fetchData();
    //filterUser();
  }, []);

  useEffect(() => {
    //se que es una aberración, pero no se me ocurre otra forma de evitar que se ejute dos veces
    if (user) {
      if (antibug == false) {
        filterUser();
        setAntibug(true);
      }
    }
  }, [user]);

  const handleEditarPerfil = () => {
    setMostrarEditarPerfil(!mostrarEditarPerfil);
  };


  const handleEdit = (e) => {
    e.preventDefault();
    console.log("Se ha enviado el formulario");
    setMostrarEditarPerfil(false);
    // Aquí se enviaría la información al servidor
    handleCambios(e);
  };

  const handleCambios = async (e) => {
    try {
      const response = await fetch(`${window.location.origin.slice(0, -5)}:9000/api/users/cambios/${IdUserIniciado}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nombre,
          email: texto
        })
      });
      if (response.ok) {
        console.log("Usuario modificado exitosamente");
        // Aquí puedes realizar alguna acción adicional después de modificar el usuario
      } else {
        console.log("Error al modificar el usuario");
      }
    } catch (error) {
      console.log("Error al llamar a la API:", error);
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };

  const togglePopup = (actividadId) => {
    setShowPopup(actividadId === showPopup ? null : actividadId);
  };

  const getImageUrl = (id_foto) => {
    if (id_foto !== undefined && id_foto >= 0 && id_foto < fotos.length) {
      return fotos[id_foto];
    }
      return '/images/foto de perfil 1.png'; // Imagen por defecto
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: '#0A1229', padding: '10px', textAlign: 'center', zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="/images/Logo U-Tad.png" alt="Imagen Izquierda" style={{ width: '75px', height: 'auto' }} />
        <div style={{ flex: 1 }}></div>
        <div className="flex items-center">
          <button onClick={handleCambioActividades} className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2.5">Actividades</button>
          <button onClick={handleCambioAForos} className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2.5">Comunidad de Alumnos</button>
        </div>

      </header>



      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ flex: '0 0 30%', padding: '20px', background: 'white', marginLeft: 0, position: 'fixed', left: 0, top: '60px', bottom: 0, width: '30%' }}>
          <img src="/images/foto de perfil 1.png" alt="Imagen Perfil" style={{ width: '45%', height: 'auto', margin: '0 auto' }} />
          <h1 className="montExtra" style={{ textAlign: 'center', marginBottom: '20px' }}>{nombre}</h1>
          <p className="montSEMI2" style={{ color: '#333', textAlign: 'center' }}>{texto}</p>
          <button style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', width: '100%', display: 'block' }} onClick={handleEditarPerfil}>Editar perfil</button>
          {mostrarEditarPerfil && (
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Nombre de usuario:</label>
                <input onChange={(e) => setNombre(e.target.value)} id="email" name="email" className="shadow-sm border-gray-300 rounded-md w-full py-2 px-4  bg-gray-100" placeholder="Nuevo nombre" />
              </div>
              <div className="flex items-start">
                <label htmlFor="password" className="block mb-2 text-sm font-medium">Email</label>
              </div>
              <input type="email" onChange={(e) => setTexto(e.target.value)} id="password" name="password" className="shadow-sm border-gray-300 rounded-md w-full py-2 px-4 mb-8 bg-gray-100" placeholder="email" />
              <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md w-full">Realizar cambios</button>
            </form>

          )}
        </div>

        <div style={{ flex: '1', padding: '20px', background: '#eee', top: '50px', bottom: 0, width: '70%', position: 'fixed', left: '30%', overflow: 'auto' }}>
          {/* Barra de búsqueda */}
          <div style={{ marginBottom: '20px' }}>
            <input type="text" placeholder="Buscar..." style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }}>
            <p className="montBlack" style={{ cursor: 'pointer', color: contenidoVisible === "Texto 1" ? 'black' : 'black', textDecoration: contenidoVisible === "Texto 1" ? 'underline' : 'none' }} onClick={() => setContenidoVisible("Texto 1")}>Actividades guardadas</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <>
              {Array.isArray(actividad) && actividad.filter(actividades => actividades.asunto.toLowerCase().includes(searchTerm.toLowerCase())).map((actividades) => (
                <li key={actividades._id} className="flex flex-col justify-between list-none p-2 bg-gray-200 rounded-lg shadow-md h-auto md:h-64 mb-4">

                <button onClick={() => togglePopup(actividades._id)} className="flex flex-col items-center justify-center w-full h-full">

                <img src={getImageUrl(actividades.id_foto)} alt="Actividad" className="w-full h-32 object-cover rounded-lg shadow-md" />

                  <div className="text-center mt-2 px-2">
                    <h2 className="text-xl font-bold line-clamp-1">{actividades.asunto}</h2>
                    <p className="text-gray-700 text-sm mt-3 line-clamp-3 h-14">{actividades.objetivo}</p>
                  </div>

                </button>

                {showPopup === actividades._id && <Actividad handleClose={() => togglePopup(actividades._id)} show={showPopup} id={actividades._id} />}

              </li>
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
