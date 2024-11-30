
const { register } = require('../services/authService')

const createUser = (req, res) => { 
    const { email, password } = req.body;
    
    const hash = register(email, password)
    res.send(hash)
}


module.exports = { createUser }