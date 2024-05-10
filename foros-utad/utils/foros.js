export async function createForum(forum, token) {
    try {
      const response = await fetch('http://localhost:9000/api/foro', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(forum)
      });
  
      if (response.ok) {
        return 'Foro creado con éxito';
      } else {
        throw new Error('No se pudo crear el foro.');
      }
    } catch (error) {
      console.error('Error al crear el foro:', error);
      throw error;
    }
  }
  