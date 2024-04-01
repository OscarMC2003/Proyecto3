export async function getUserId(token) {
    try {
        const response = await fetch('http://localhost:9000/api/getUserId', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.id;
        } else {
            throw new Error('No se pudo obtener el ID del usuario.');
        }
    } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
        throw error;
    }
}