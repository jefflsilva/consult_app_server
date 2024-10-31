## Estrutura de Pastas e Responsabilidades

```plaintext
src/
│
├── application/
│   ├── dtos/
│   ├── services/
│   └── use-cases/
│
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── services/
│
├── infrastructure/
│   ├── repositories/
│   └── database/
│   └── services/
│
├── tests/
│   ├── unit/
│   └── integration/
│
└── index.ts
```

# Estrutura de Pastas e Responsabilidades

- **src/**: Pasta raiz para todo o código do projeto.

- **application/**: Camada responsável pela lógica de aplicação e orquestração de serviços e casos de uso.

    - **dtos/**: Contém os "Data Transfer Objects" (DTOs) que definem os dados de entrada e saída dos casos de uso, simplificando e estruturando a comunicação entre camadas.
    - **services/**: Implementa serviços que orquestram lógica de aplicação. Exemplo: UserService poderia coordenar a lógica de cadastro de usuário, utilizando repositórios, DTOs e casos de uso.
    - **use-cases/**: Implementa os casos de uso individuais que descrevem as ações específicas que o sistema pode executar. Exemplo: CreateUser como caso de uso para o registro de um usuário.

- **domain/**: Camada de domínio onde ficam os componentes principais e a lógica central do negócio.

    - **entities/**: Contém as entidades centrais do domínio com suas propriedades e métodos. Exemplo: User poderia ser uma entidade com atributos como id, name, email.
    - **repositories/**: Define as interfaces de repositório para operações de persistência, especificando o que o repositório deve fazer sem definir como.
    - **services/**: Contém interfaces para serviços específicos ao domínio, como IEncryptService, que define os métodos de criptografia.

- **infrastructure/**: Camada de infraestrutura para implementações concretas de repositórios e serviços externos.

    - **repositories/**: Implementações específicas das interfaces de repositórios. Exemplo: PrismaUserRepository, usando Prisma para interagir com o banco de dados.
    - **database/**: Configurações de conexão e setup do banco de dados, que podem ser específicas da tecnologia.
    - **services/**: Implementações concretas dos serviços, como EncryptService, que utiliza uma biblioteca para criptografia.

- **tests/**: Diretório onde ficam os testes do projeto, com pastas separadas para testes unitários e de integração.

    - **unit/**: Testes unitários que validam funcionalidades específicas e isoladas, sem dependência de componentes externos.
    - **integration/**: Testes de integração que validam a interação entre múltiplas partes do sistema.

# Passo a Passo para Criação do Primeiro Arquivo com Foco em TDD e Clean Architecture

1. **Definir o Caso de Uso**  
   Escolha um caso de uso claro, como "Registrar um Usuário". O objetivo deste caso de uso é descrever a ação específica que será executada pelo sistema, sem se preocupar com implementações concretas.

2. **Criar o Teste de Unidade (TDD)**  
   No TDD, o primeiro passo é criar o teste que falhará inicialmente.

    - **Local**: `tests/unit/use-cases/createUser.test.ts`
    - **Objetivo**: Validar o fluxo de registro de usuário.
    - **Objetivo do Teste**: Verificar se o caso de uso CreateUser cria o usuário com os dados corretos.
    - **Mocks**: Utilizar mocks para as dependências externas, como repositórios e serviços.

3. **Criar a Interface do Repositório de Usuários**  
   Defina o contrato para operações de persistência.
    - **Local**: `domain/repositories/UserRepository.ts`

4. **Implementar a Entidade User**  
   Implemente a entidade User, que define os atributos do usuário.
    - **Local**: `domain/entities/User.ts`

5. **Implementar o Caso de Uso CreateUser**  
   Desenvolva o caso de uso CreateUser, que irá utilizar o repositório de usuário para realizar o registro.
    - **Local**: `application/use-cases/createUser.ts`

6. **Implementar o Serviço UserService para Orquestrar o Caso de Uso**  
   O UserService atuará como um orquestrador, usando o caso de uso CreateUser.
    - **Local**: `application/services/UserService.ts`

7. **Implementar o Repositório PrismaUserRepository**  
   Este repositório implementa a interface UserRepository e lida com a persistência.
    - **Local**: `infrastructure/repositories/PrismaUserRepository.ts`

8. **Executar o Teste e Refatorar se Necessário**  
   Após implementar todas as partes, execute o teste com `npm test` e valide se está passando. Se falhar, faça as correções necessárias.

# Conclusão

Esta estrutura promove a separação de responsabilidades e facilita o desenvolvimento orientado por testes (TDD) e arquitetura limpa (Clean Architecture).
