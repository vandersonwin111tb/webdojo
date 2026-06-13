# 🚀 Projeto de Testes Automatizados - WebDojo

Este projeto contém os testes automatizados da aplicação **WebDojo**, desenvolvidos utilizando **Cypress** para validação dos fluxos funcionais da aplicação web.

---

## 📋 Pré-requisitos

- Node.js (versão 18+ recomendada)
- npm
- Git

---

## 📂 Estrutura do Projeto

```text
cypress/
├── e2e/
├── fixtures/
│   ├── cep.json
│   └── consultancy.json
└── support/
    ├── actions/
    ├── commands.js
    ├── e2e.js
    └── utils.js

dist/
node_modules/

cypress.config.js
package.json
package-lock.json
```

## ▶️ Executando a Aplicação

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

## 🧪 Executando os Testes

### Executar toda a suíte

```bash
npm test
```

### Executar Cypress em modo interativo

```bash
npm run test:ui
```

### Executar apenas os testes de Login

```bash
npm run test:login
```

### Executar testes de Login em resolução Mobile

```bash
npm run test:login:mobile
```

## 📐 Resoluções Utilizadas

| Tipo | Largura | Altura |
|--------|----------|---------|
| Desktop | 1440 | 900 |
| Mobile | 414 | 896 |

## 🔄 Fluxo de Execução Recomendado

```bash
npm install
npm run dev
npm test
```

## 👨‍💻 Tecnologias Utilizadas

- Cypress
- JavaScript
- Node.js
- npm
