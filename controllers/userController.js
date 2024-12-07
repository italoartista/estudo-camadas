const UserService = require('../services/userService')


class UserController { 
    constructor() {
        this.userService = null;   
    }

    createUser (req, res) { 
        const { email, password } = req.body;
        
        this.userService = new UserService(email, password)
        
        this.userService.register()
        
        res.send({msg: "Usuario cadastrado com sucesso!"})
    }
    
    deleteUser (req, res)  { 
        const { email, password } = req.body;
      
        this.userService = new UserService(email, password)
        
        this.userService.delete()
     
        res.send({msg: "Usuario deletado com sucesso"})
    }

}



module.exports = UserController