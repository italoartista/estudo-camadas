const pool = require('../config/db');

class UserRepository {
    constructor(user) {
        this.user = user;
    }

    save = async (hash) => {
        try {
            const result = await pool.query(
                'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
                [this.user.email, hash]
            );
            return result.rows[0];
        } catch (err) {
            console.error(err);
            throw new Error('Erro ao adicionar usuário');
        }
    }

    delete = async () => {
        try {
            const result = await pool.query(
                'DELETE FROM users WHERE email = $1 RETURNING *',
                [this.user.email]
            );
            return result.rows[0];
        } catch (err) {
            console.error(err);
            throw new Error('Erro ao deletar usuário');
        }
    }

    getByEmail = async (email) => {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );
            return result.rows[0];
        } catch (err) {
            console.error(err);
            throw new Error('Erro ao buscar usuário');
        }
    }
}

module.exports = UserRepository;
