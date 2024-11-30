// function hashPassword(password, algorithm) {
//     return crypto.createHash(algorithm).update(password).digest('hex');
// }


// async (req, res) => {
//     const { email, password } = req.body;

//     const hashedPasswordSHA256 = hashPassword(password, 'sha256');

//     try {
//         const result = await pool.query(
//             'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
//             [email, hashedPasswordSHA256]
//         );
//         res.send(`Usuário adicionado com sucesso! Email: ${email}`);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Erro ao adicionar usuário');
//     }
// }