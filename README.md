# 🩺 Aplicativo de Agendamentos de Consultas Online

Este é um aplicativo de agendamento de consultas online, desenvolvido para conectar profissionais de saúde com pacientes de forma prática e intuitiva. O sistema permite a criação de perfis para profissionais e pacientes, agendamentos personalizados, sincronização de horários, preferências de consulta e avaliações pós-consulta, além de envio de confirmações por e-mail.

 **Nota**: Este repositório contém apenas o código do backend. Para o código do front, acesse o repositório [Consult App](https://github.com/jefflsilva/consult_app).
 
 ## Deploy

O projeto está hospedado e pode ser acessado através do seguinte link:

[Consult App DEMO](https://apiconsulta-25818254e04b.herokuapp.com/)

## 📋 Funcionalidades

### Usuário Paciente
- **Criação de perfil de paciente**: O paciente cria um perfil com informações como nome, e-mail, telefone e preferências de consulta.
- **Agendamento de consulta**: Busca e visualização de horários disponíveis dos profissionais e marcação de consultas.
- **Confirmação de agendamento por e-mail**: Recebe confirmação de agendamento diretamente no e-mail.
- **Avaliação de consulta**: Após cada consulta, o paciente pode avaliar o profissional, ajudando outros usuários na escolha.

### Usuário Profissional
- **Criação de perfil de profissional**: Cadastro do profissional com especialidade, biografia e detalhes de contato.
- **Configuração de horários de atendimento**: Definição de disponibilidade de horários para consultas.
- **Visualização de agenda**: Acompanhamento dos agendamentos em tempo real.
- **Match de horários**: Sincronização automática entre horários livres do profissional e preferências de horários do paciente.
  
### Funcionalidades Gerais
- **Notificações de Agendamento**: Notificações por e-mail para confirmações, cancelamentos e lembretes de consulta.
- **Filtragem e Pesquisa**: Pesquisa por profissionais, especialidades e tipos de consulta (presencial, online).
- **Sistema de Avaliação**: Pacientes podem avaliar os profissionais após consultas, com feedback visível no perfil do profissional.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **Vue.js** com **TypeScript**: Para criação da interface responsiva e interativa.
- **Tailwind CSS**: Para estilização moderna e responsiva do layout.
- **Vue Router**: Gerenciamento de navegação e rotas.
- **Axios**: Integração com a API para envio de requisições HTTP.

### Backend
- **Node.js** com **Express**: Para criação da API RESTful e integração com banco de dados.
- **JWT**: Autenticação segura de usuários.
- **Banco de Dados**: PostgreSQL para gerenciamento de informações dos perfis, agendamentos e avaliações.
- **WebSocket**: Para atualizações em tempo real na agenda.

### Outros Serviços
- **Envio de E-mails**: AWS SES ou Nodemailer para envio de notificações e confirmações.
