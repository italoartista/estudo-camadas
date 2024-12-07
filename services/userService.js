const crypto = require('crypto')
const User  = require('../models/user')
const UserRepository = require('../repository/userRepository')

class UserService {
    constructor(email, password) {
        this.user = new User(email, password)
        this.userRepository = new UserRepository(this.user)
    }

    hashPassword(password, algorithm) {
        return crypto.createHash(algorithm).update(password).digest('hex');
    }

    register() {
        const hash = hashPassword(this.user.password, "sha256")       
        this.userRepository.save(hash)
    }

    delete() {
        this.userRepository.delete()
    }
}

module.exports = UserService

