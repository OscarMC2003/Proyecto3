import executeQuery from '../connection/db';
import { NextResponse } from 'next/server'

const loginController = async (req) => {
    try {
        const { email, password } = await req.json();
        
        const query = "SELECT * FROM usuarios WHERE email = ? AND clave = ?"; 
        
        const result = await executeQuery(query, [email, password]);

        if (result.length > 0) {
            return NextResponse.json({ message: 'Inicio de sesión exitoso' }, { status: 200 })
        } else {
            return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 })
        }
    } catch (error) {
        console.error("Error al verificar las credenciales en la base de datos:", error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
    }
};

module.exports = {
    loginController,
};
