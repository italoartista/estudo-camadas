
# Arquitetura em Camadas com Node.js/Express

## Índice

1. [Introdução](#introdução)  
2. [Conceitos Básicos](#conceitos-básicos)  
3. [Camadas da Arquitetura](#camadas-da-arquitetura)  
   - [1. Apresentação (Presentation)](#apresentação)  
   - [2. Aplicação (Application)](#aplicação)  
   - [3. Domínio (Domain)](#domínio)  
   - [4. Infraestrutura (Infrastructure)](#infraestrutura)  
4. [Design Patterns Utilizados](#design-patterns-utilizados)  
5. [Estrutura de Diretórios](#estrutura-de-diretórios)  
6. [Exemplo Prático](#exemplo-prático)  
7. [Considerações Finais](#considerações-finais)  

---

## Introdução

A arquitetura em camadas organiza o código em diferentes níveis de abstração, promovendo separação de responsabilidades, facilidade de manutenção e escalabilidade. Utilizaremos **Node.js/Express** como framework e aplicaremos design patterns clássicos e modernos para melhorar a qualidade do código.

---

## Conceitos Básicos

- **Separation of Concerns**: Cada camada deve focar em uma responsabilidade específica.  
- **Independência**: Camadas superiores dependem de contratos, não de implementações concretas.  
- **Testabilidade**: Arquiteturas em camadas são ideais para aplicar práticas como **TDD**.  

---

## Camadas da Arquitetura

### Apresentação (Presentation)

Responsável por lidar com as interações do usuário, como requisições HTTP. Inclui:

- **Rotas** e controladores para manipular as requisições e preparar as respostas.
- Integração com middlewares.

### Aplicação (Application)

Contém regras de coordenação e orquestração, mas não regras de negócio. Exemplos:

- **Casos de uso (Use Cases)**: Gerenciam fluxos específicos.
- Validação e autorização.

### Domínio (Domain)

Foco nas regras de negócio da aplicação. Inclui:

- **Entidades**: Representam conceitos principais do sistema.  
- **Serviços de Domínio**: Executam lógica complexa de negócio que não pertence a uma única entidade.

### Infraestrutura (Infrastructure)

Responsável pela interação com o mundo externo. Exemplos:

- **Repositórios**: Lida com persistência de dados.  
- **Gateways**: Comunicação com APIs externas.  
- Integração com bancos de dados.

---

## Design Patterns Utilizados

### Padrões de Estrutura

1. **Repository**: Interface entre a camada de domínio e o banco de dados.  
2. **Active Record**: Encapsula dados e métodos do banco diretamente em objetos.  
3. **Data Mapper**: Traduz objetos para dados armazenados no banco.

### Padrões Criacionais

1. **Factory**: Criação de objetos complexos.  
2. **Builder**: Montagem de objetos de forma incremental.

### Padrões Comportamentais

1. **Command**: Representa uma solicitação como um objeto independente.  
2. **Observer**: Define uma dependência "um para muitos".  
3. **Strategy**: Permite selecionar algoritmos em tempo de execução.

---

## Estrutura de Diretórios

```plaintext
src/
├── application/
│   ├── use-cases/
│   └── interfaces/
├── domain/
│   ├── entities/
│   └── services/
├── infrastructure/
│   ├── database/
│   ├── repositories/
│   └── gateways/
├── presentation/
│   ├── controllers/
│   └── routes/
└── shared/
    ├── utils/
    └── errors/
```

---

## Exemplo Prático

### Controlador (Presentation)

```javascript
// src/presentation/controllers/UserController.js
const GetUserUseCase = require('../../application/use-cases/GetUserUseCase');

class UserController {
  static async getUser(req, res, next) {
    try {
      const user = await GetUserUseCase.execute(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
```

### Caso de Uso (Application)

```javascript
// src/application/use-cases/GetUserUseCase.js
const UserRepository = require('../../infrastructure/repositories/UserRepository');

class GetUserUseCase {
  static async execute(userId) {
    return await UserRepository.findById(userId);
  }
}

module.exports = GetUserUseCase;
```

### Repositório (Infrastructure)

```javascript
// src/infrastructure/repositories/UserRepository.js
const db = require('../database');

class UserRepository {
  static async findById(id) {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return user.rows[0];
  }
}

module.exports = UserRepository;
```

### Entidade (Domain)

```javascript
// src/domain/entities/User.js
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

module.exports = User;
```

---

## Considerações Finais

Este modelo proporciona:

1. **Alta coesão** e **baixo acoplamento**.  
2. Fácil expansão e adição de novas funcionalidades.  
3. Excelente base para TDD e CI/CD.

Para implementar este projeto, siga o exemplo prático e adapte-o às suas necessidades. 

--- 

Deseja que eu adicione exemplos adicionais, como configuração do banco de dados ou testes unitários?
