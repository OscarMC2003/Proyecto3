const { dbConnect } = require('./mysql/connection/db');


// Llamar a la función para establecer la conexión a la base de datos
dbConnect()
  .then(() => {
    console.log('Conexión a la base de datos establecida exitosamente')
  })
  .catch((err) => {
    console.error('Error al establecer la conexión a la base de datos:', err);
  });
