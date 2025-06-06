# 🚀 Dashboard de Produtos - S.Coders 🚀

Este é um dashboard interativo e em tempo real para gerenciamento e visualização de produtos, construído com **Next.js**.  
Ele oferece uma interface moderna e responsiva para acompanhar suas informações de produtos de forma eficiente.

---

## ✨ Funcionalidades Principais

- **CRUD Completo de Produtos**: Gerencie seus produtos com operações de criação, leitura, atualização e exclusão (CRUD).
- **Visualização em Tempo Real**: Acompanhe a quantidade total de produtos em cards dinâmicos.
- **Insights por Categoria**: Visualize a quantidade de produtos por categoria em cards dedicados.
- **Tabela Interativa de Produtos**: Exiba todos os produtos em uma tabela detalhada e fácil de navegar.
- **OBSERVAÇÃO**: É necessário estar logado para criar, editar ou apagar um produto.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes ferramentas e bibliotecas modernas:

- **Next.js**: Framework React para construção de aplicações web de alto desempenho.
- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript, melhorando a robustez do código.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **lucide-react**: Pacote de ícones bonitos e personalizáveis para o React.
- **Formik**: Biblioteca para gerenciar formulários de forma eficiente.
- **Yup**: Esquema de validação de objetos para garantir a integridade dos dados do formulário.
- **React-Toastify**: Notificações toast fáceis de usar para feedback ao usuário.
- **Socket.io-client**: Biblioteca para comunicação em tempo real entre o cliente e o servidor.
- **Axios**: Cliente HTTP baseado em Promises para fazer requisições a APIs.


## 🌐 Deploy na Vercel

Você pode explorar o dashboard online através do deploy feito na Vercel:

👉 Acesse aqui: https://scoders-front-fvv9q97cn-marcelotadinis-projects.vercel.app/
- **OBSERVAÇÃO**: É necessário esperar até que o backend seja ativado. Para isso, acesse a rota /dashboard e aguarde até que os dados sejam retornados.

## 🚀 Como Executar o Projeto (com Docker)

Para colocar o dashboard em funcionamento na sua máquina usando Docker, siga os passos abaixo a partir da raiz do projeto:

### 1. Construa a imagem Docker:

```bash
docker build -t scoders-front .
``` 
### 2. Execute o contêiner Docker:
```bash
docker run -p 3001:3001 scoders-front
``` 

Após a execução bem-sucedida, o dashboard estará acessível em http://localhost:3001 no seu navegador.

## 🚀 Backend
Para acessar o repositório do backend, entre no link abaixo.
👉 Acesse aqui: [https://scoders-front-fvv9q97cn-marcelotadinis-projects.vercel.app/](https://github.com/MarceloTadini/scoders-back)

