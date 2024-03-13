const bcryptjs = require("bcryptjs")

const encrypt = async (clearPassword) => {
    // En criptografía, el número o string "Salt" le otorga aleatoriedad a la función hash al combinarla con la password en claro.
    const hash = await bcryptjs.hash(clearPassword, 10) //le aplica el hash HS256 a la contraseña, el 10 es randomizador
    return hash
}


const compare = async (clearPassword, hashedPassword) => { 
    // Compara entre la password en texto plano (en claro) y su hash calculado anteriormente para decidir si coincide.
    const result = await bcryptjs.compare(clearPassword, hashedPassword)
    return result
}

module.exports = { encrypt, compare }