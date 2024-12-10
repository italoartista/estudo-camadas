Ótimo! Vamos aprofundar o material adicionando as seguintes seções práticas:

1. **Configuração Inicial do Projeto**: Como criar e estruturar o projeto.  
2. **Configuração do Banco de Dados**: Integração com PostgreSQL usando consultas SQL puras.  
3. **Implementação de Patterns Avançados**: Exemplos do uso de padrões como *Command*, *Observer* e *Strategy*.  
4. **Testes Unitários e de Integração**: Cobertura com ferramentas como Jest e Supertest.  
5. **Execução e Deploy**: Script para iniciar o projeto e dicas para implantar.

---

# 1. Configuração Inicial do Projeto

### Passo 1: Inicializar o Projeto

```bash
mkdir node-layered-architecture
cd node-layered-architecture
npm init -y
```

### Passo 2: Instalar Dependências

```bash
npm install express pg dotenv
npm install --save-dev jest supertest nodemon eslint
```

### Passo 3: Estrutura Inicial

```bash
mkdir -p src/{application,domain,infrastructure/{database,repositories},presentation/{controllers,routes},shared/{utils,errors}}
```

Crie o arquivo `index.js` na raiz:

```javascript
// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src/presentation/routes');

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

# 2. Configuração do Banco de Dados

### Passo 1: Configurar o Banco

No arquivo `.env`, defina as variáveis:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=youruser
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
```

### Passo 2: Criar Conexão

```javascript
// src/infrastructure/database/index.js
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

---

# 3. Implementação de Patterns Avançados

### **Padrão Strategy**

Um exemplo para validação de dados de usuários.

```javascript
// src/domain/services/UserValidationStrategy.js
class NameValidation {
  validate(input) {
    return input.name.length > 2;
  }
}

class EmailValidation {
  validate(input) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email);
  }
}

class Validator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  validate(input) {
    return this.strategy.validate(input);
  }
}

module.exports = { NameValidation, EmailValidation, Validator };
```

**Uso no Controlador:**

```javascript
// src/presentation/controllers/UserController.js
const { NameValidation, Validator } = require('../../domain/services/UserValidationStrategy');

const validator = new Validator(new NameValidation());
const isValid = validator.validate({ name: 'John' });
console.log(`Name is valid: ${isValid}`);
```

---

### **Padrão Observer**

Exemplo para notificação em tempo real:

```javascript
// src/domain/services/NotificationObserver.js
class Subject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class EmailObserver {
  update(data) {
    console.log(`Email sent to: ${data.email}`);
  }
}

class SMSObserver {
  update(data) {
    console.log(`SMS sent to: ${data.phone}`);
  }
}

module.exports = { Subject, EmailObserver, SMSObserver };
```

**Uso no Caso de Uso:**

```javascript
// src/application/use-cases/RegisterUserUseCase.js
const { Subject, EmailObserver, SMSObserver } = require('../../domain/services/NotificationObserver');

const notificationSubject = new Subject();
notificationSubject.attach(new EmailObserver());
notificationSubject.attach(new SMSObserver());

notificationSubject.notify({ email: 'user@example.com', phone: '1234567890' });
```

---

# 4. Testes Unitários e de Integração

### Configuração do Jest

Adicione no `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

### Exemplo de Teste Unitário

Teste para o repositório:

```javascript
// src/infrastructure/repositories/UserRepository.test.js
const UserRepository = require('./UserRepository');
const db = require('../database');

jest.mock('../database');

describe('UserRepository', () => {
  it('should return a user by id', async () => {
    const mockUser = { id: 1, name: 'John' };
    db.query.mockResolvedValue({ rows: [mockUser] });

    const user = await UserRepository.findById(1);
    expect(user).toEqual(mockUser);
  });
});
```

### Exemplo de Teste de Integração

```javascript
// tests/integration/UserController.test.js
const request = require('supertest');
const app = require('../../index');

describe('GET /api/users/:id', () => {
  it('should return user data', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
  });
});
```

---

# 5. Execução e Deploy

### Passo 1: Scripts para Desenvolvimento

No `package.json`, configure:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Execute:

```bash
npm run dev
```

### Passo 2: Deploy com Docker

Crie o arquivo `Dockerfile`:

```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

---

Posso expandir alguma dessas seções?
