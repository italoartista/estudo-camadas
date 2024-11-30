const express = require('express');
const authRoute = require('./routes/authRoute')

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});