const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // substitua pelo seu usuário do PostgreSQL
    host: 'localhost', // substitua pelo host do seu PostgreSQL
    database: 'store', // substitua pelo nome do seu banco de dados
    password: '1234', // substitua pela sua senha do PostgreSQL
    port: 5432, // porta padrão do PostgreSQL
});


module.exports = pool