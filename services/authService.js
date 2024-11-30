const crypto = require('crypto')
const { saveUser } = require('../models/user')

function hashPassword(password, algorithm) {
    return crypto.createHash(algorithm).update(password).digest('hex');
}


const register = ( email, password) => {
    const hash = hashPassword(password, "sha256")
    
    const user = { 
        email,
        hash
    }

    saveUser(user)
}


module.exports = { register  }

