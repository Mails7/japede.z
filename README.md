# 🍽️ JáPede - Sistema de Gestão de Restaurante

Sistema completo de gestão para restaurantes com pedidos online, controle de estoque, gestão de mesas e muito mais.

## 🚀 Tecnologias

### 🎯 Core Framework
- **⚡ Next.js 15** - Framework React para produção com App Router
- **📘 TypeScript 5** - JavaScript tipado para melhor experiência de desenvolvimento
- **🎨 Tailwind CSS 4** - Framework CSS utility-first para desenvolvimento rápido de UI

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - Componentes de alta qualidade construídos sobre Radix UI
- **🎯 Lucide React** - Biblioteca de ícones consistentes e bonitos
- **🌈 Framer Motion** - Biblioteca de animações pronta para produção
- **🎨 Next Themes** - Mode escuro perfeito em 2 linhas de código

### 📋 Formulários & Validação
- **🎣 React Hook Form** - Formulários performáticos com validação fácil
- **✅ Zod** - Validação de schema TypeScript-first

### 🔄 Gerenciamento de Estado & Data Fetching
- **🐻 Zustand** - Gerenciamento de estado simples e escalável
- **🔄 TanStack Query** - Sincronização de dados poderosa para React
- **🌐 Axios** - Cliente HTTP baseado em Promise

### 🗄️ Database & Backend
- **🗄️ Prisma** - ORM de próxima geração para Node.js e TypeScript
- **🔐 NextAuth.js** - Solução de autenticação open-source completa
- **📡 Socket.IO** - Comunicação em tempo real

### 🎨 Funcionalidades Avançadas de UI
- **📊 TanStack Table** - UI headless para construção de tabelas e datagrids
- **🖱️ DND Kit** - Toolkit moderno de drag and drop para React
- **📊 Recharts** - Biblioteca de gráficos redefinida construída com React e D3
- **🖼️ Sharp** - Processamento de imagem de alta performance

## 📁 Estrutura do Projeto

```
src/
├── app/                     # Next.js App Router pages e layouts
│   ├── api/                # API routes organizadas por domínio
│   │   ├── auth/           # Autenticação e autorização
│   │   ├── categories/     # Gestão de categorias
│   │   ├── menu-items/     # Gestão de itens do menu
│   │   ├── orders/         # Gestão de pedidos
│   │   ├── profiles/       # Gestão de perfis de usuário
│   │   ├── settings/       # Configurações do sistema
│   │   └── tables/         # Gestão de mesas
│   ├── dashboard/          # Dashboard principal
│   └── globals.css         # Estilos globais
├── components/
│   ├── ui/                 # Componentes base shadcn/ui
│   └── business/           # Componentes específicos do negócio
│       ├── auth/           # Componentes de autenticação
│       └── dashboard/      # Componentes do dashboard
├── hooks/
│   └── business/           # Hooks customizados do negócio
├── lib/
│   ├── api/                # Lógica da API organizada
│   ├── server/             # Configurações do servidor
│   ├── db.ts               # Configuração do Prisma
│   └── utils.ts            # Utilitários gerais
├── types/                  # Definições de tipos TypeScript
│   ├── auth.ts             # Tipos de autenticação
│   ├── menu.ts             # Tipos do menu
│   ├── orders.ts           # Tipos de pedidos
│   ├── tables.ts           # Tipos de mesas
│   ├── settings.ts         # Tipos de configurações
│   ├── api.ts              # Tipos de resposta da API
│   └── index.ts            # Re-exports
├── config/
│   └── server.ts           # Configuração do servidor
└── prisma/
    └── schema.prisma       # Schema do banco de dados
```

## 🎯 Melhorias na Estrutura

### ✅ Organização por Domínio
- **APIs organizadas** por contexto (auth, menu, orders, etc.)
- **Componentes separados** entre UI genéricos e específicos do negócio
- **Hooks customizados** agrupados por funcionalidade

### ✅ TypeScript Melhorado
- **Types centralizados** em `/src/types/`
- **Interfaces bem definidas** para todas as entidades
- **Type safety** end-to-end

### ✅ Separação de Responsabilidades
- **Lógica de API** isolada em `/src/lib/api/`
- **Configurações** centralizadas em `/src/config/`
- **Middleware** para autenticação e tratamento de erros

### ✅ Componentes Modulares
- **Componentes de negócio** reutilizáveis
- **Hooks customizados** para lógica específica
- **Separação clara** entre UI e lógica de negócio

## 🚀 Como Usar

```bash
# Instalar dependências
npm install

# Configurar banco de dados
npm run db:push

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🔐 Funcionalidades

- **Sistema de autenticação** completo com JWT
- **Gestão de menu** com categorias e itens
- **Sistema de pedidos** com diferentes tipos (Mesa, Delivery, Balcão)
- **Gestão de mesas** com status em tempo real
- **Dashboard administrativo** com estatísticas
- **Configurações** personalizáveis do sistema
- **Comunicação em tempo real** com Socket.IO

---

Sistema desenvolvido com foco na escalabilidade e manutenibilidade do código! 🚀