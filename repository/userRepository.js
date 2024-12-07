const pool = require('../config/db')

class UserRepository { 
 
    constructor(user) { 
        this.user = user
    }


   save = async (hash) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
            [this.user.email, hash]
        );
        res.send(`Usuário adicionado com sucesso! Email: ${this.user.email}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao adicionar usuário');
    }
}


    delete = async () => {
        try {
            const result = await pool.query(
                'DELETE users WHERE email = $1',
                [this.user.email]
            );
            res.send(`Usuário adicionado com sucesso! Email: ${this.user.email}`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao adicionar usuário');
        }
    }
}

modules.exports = UserRepository