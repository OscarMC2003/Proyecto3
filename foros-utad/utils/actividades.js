export async function createActivity(activity, token) {
    try {
        const response = await fetch('http://localhost:9000/api/actividades/createActivities', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activity)
        });

        if (response.ok) {
            return 'Actividad agregada con éxito';
        } else {
            throw new Error('No se pudo agregar la actividad.');
        }
    } catch (error) {
        console.error('Error al agregar la actividad:', error);
        throw error;
    }
}
