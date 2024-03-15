"use client";
import React, { useState } from 'react';

const Perfil = () => {
  const [contenidoVisible, setContenidoVisible] = useState("Texto 1");
  const [searchTerm, setSearchTerm] = useState("");
  const [nombre, setNombre] = useState("Nombre");
  const [textoPrueba, setTextoPrueba] = useState("Texto Prueba");
  const [mostrarEditarPerfil, setMostrarEditarPerfil] = useState(false);

  const handleEditarPerfil = () => {
    setMostrarEditarPerfil(!mostrarEditarPerfil);
  };

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleChangeTextoPrueba = (e) => {
    const texto = e.target.value;
    if (texto.length <= 250) {
      setTextoPrueba(texto);
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: '#888888', padding: '10px', textAlign: 'center', zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="/images/cuadrado.png" alt="Imagen Izquierda" style={{ width: '75px', height: 'auto' }} />
        <div style={{ flex: 1 }}></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Actividades</button>
          <button style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Comunidad de Alumnos</button>
        </div>
      </header>



      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <div style={{ flex: '0 0 30%', padding: '20px', background: 'white', marginLeft: 0, position: 'fixed', left: 0, top: '60px', bottom: 0, width: '30%' }}>
          <img src="/images/userVacio.png" alt="Imagen Perfil" style={{ width: '45%', height: 'auto', margin: '0 auto' }} />
          <h1 className="montExtra" style={{ textAlign: 'center', marginBottom: '20px' }}>{nombre}</h1>
          <p className="montSEMI2" style={{ color: '#333', textAlign: 'center' }}>{textoPrueba}</p>
          <button style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', width: '100%', display: 'block' }} onClick={handleEditarPerfil}>Editar perfil</button>
          {mostrarEditarPerfil && (
            <div style={{ marginTop: '20px' }}>
              <input type="text" placeholder="Nuevo nombre" value={nombre} onChange={handleChangeNombre} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }} />
              <input type="text" placeholder="Nuevo texto de prueba" value={textoPrueba} onChange={handleChangeTextoPrueba} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }} />
            </div>
          )}
        </div>

        <div style={{ flex: '1', padding: '20px', background: '#eee', top: '50px', bottom: 0, width: '70%', position: 'fixed', left: '30%', overflow: 'auto' }}>
          {/* Barra de búsqueda */}
          <div style={{ marginBottom: '20px' }}>
            <input type="text" placeholder="Buscar..." style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }}>
            <p className="montBlack" style={{ cursor: 'pointer', color: contenidoVisible === "Texto 1" ? 'black' : 'black', textDecoration: contenidoVisible === "Texto 1" ? 'underline' : 'none' }} onClick={() => setContenidoVisible("Texto 1")}>Actividades guardadas</p>
            <p className="montBlack" style={{ cursor: 'pointer', color: contenidoVisible === "Texto 2" ? 'black' : 'black', textDecoration: contenidoVisible === "Texto 2" ? 'underline' : 'none' }} onClick={() => setContenidoVisible("Texto 2")}>Inscripciones</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {contenidoVisible === "Texto 1" && (
              <>
                {Array.from({ length: 10 }, (_, index) => {
                  const actividad = `Actividad ${index + 1}`;
                  if (!actividad.toLowerCase().includes(searchTerm.toLowerCase())) return null;

                  return (
                    <div key={index} style={{ width: '45%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                      <img src="/images/cuadrado.png" alt={actividad} style={{ width: '100%', height: 'auto' }} />
                      <p className="montRegular" style={{ color: '#333' }}>{actividad}</p>
                      <p className="montLight" style={{ color: '#333' }}>Código explicativo</p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
