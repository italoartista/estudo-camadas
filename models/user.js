const pool = require('../config/db')


const saveUser = async (user) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
            [user.email, user.hash]
        );
        res.send(`Usuário adicionado com sucesso! Email: ${email}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao adicionar usuário');
    }
}

module.exports = { saveUser } 
