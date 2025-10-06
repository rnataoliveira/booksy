# Booksy Landing Page

Uma landing page moderna e responsiva para o Booksy - plataforma de gerenciamento de reservas.

## 📋 Sobre o Projeto

O Booksy é uma plataforma intuitiva que permite a profissionais criarem e gerenciarem suas salas de reservas de forma simples e eficiente. Esta landing page foi desenvolvida para apresentar a plataforma e facilitar o processo de cadastro e login dos usuários.

## 🚀 Funcionalidades

### Área Pública
- **Landing Page Principal**: Hero section com call-to-action, seções sobre, como funciona e comunidade
- **Página de Login/Cadastro**: Autenticação com Google, e-mail/senha e opção de visitante
- **Página Sobre/Missão**: Informações sobre propósito, valores, equipe e contato

### Características Técnicas
- Design responsivo (mobile-first)
- Animações e transições suaves
- Validação de formulários em tempo real
- Sistema de notificações
- Navegação intuitiva
- Otimização de performance

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox/Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **Google Fonts**: Tipografia (Inter)
- **CSS Variables**: Sistema de design consistente

## 📁 Estrutura do Projeto

```
booksy-landing/
├── index.html              # Landing page principal
├── login.html              # Página de login/cadastro
├── about.html              # Página sobre/missão
├── css/
│   ├── main.css            # Estilos base e variáveis
│   ├── components.css      # Componentes reutilizáveis
│   └── responsive.css      # Media queries responsivas
├── js/
│   ├── main.js             # Funcionalidades principais
│   ├── auth.js             # Sistema de autenticação
│   └── components.js       # Componentes JavaScript
├── images/                 # Imagens e assets
├── assets/                 # Recursos adicionais
└── README.md              # Documentação
```

## 🎨 Design System

### Cores
- **Primária**: #2563eb (azul moderno)
- **Secundária**: #10b981 (verde sucesso)
- **Accent**: #f59e0b (laranja para CTAs)
- **Neutras**: Escala de cinzas do #f8fafc ao #0f172a

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Escala**: 0.75rem a 3.75rem

### Componentes
- Botões (primário, secundário, outline, ghost)
- Formulários com validação
- Cards informativos
- Sistema de notificações
- Navegação responsiva

## 📱 Responsividade

O projeto foi desenvolvido com abordagem mobile-first e suporta:

- **Mobile Small**: 320px+
- **Mobile Large**: 480px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## ⚡ Funcionalidades JavaScript

### Navegação
- Menu mobile com animações
- Scroll suave entre seções
- Header com efeito de scroll
- Links ativos baseados na posição

### Autenticação
- Formulários de login e cadastro
- Validação em tempo real
- Integração simulada com Google OAuth
- Modo visitante (POC)
- Recuperação de senha

### Interações
- Animações de entrada
- Contadores animados
- Sistema de notificações
- Tooltips e dropdowns
- Validação de formulários

## 🔧 Como Usar

1. **Visualização Local**:
   ```bash
   # Abra o arquivo index.html em um navegador
   # ou use um servidor local como Live Server
   ```

2. **Servidor Local** (recomendado):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (com http-server)
   npx http-server
   ```

3. **Acesse**: `http://localhost:8000`

## 📋 Funcionalidades por Página

### Index.html (Landing Page)
- Hero section com estatísticas
- Seção sobre com cards informativos
- Como funciona (3 passos)
- Depoimentos da comunidade
- Call-to-action final
- Footer completo

### Login.html (Autenticação)
- Formulário de login
- Formulário de cadastro
- Recuperação de senha
- Login com Google (simulado)
- Acesso como visitante
- Validação em tempo real

### About.html (Sobre/Missão)
- Seção de missão
- Valores da empresa
- Equipe
- Formulário de contato
- Newsletter signup

## 🎯 Otimizações

### Performance
- CSS minificado e otimizado
- JavaScript modular
- Lazy loading para imagens
- Preload de recursos críticos
- Throttle/debounce em eventos

### SEO
- Meta tags otimizadas
- Estrutura HTML semântica
- Alt text em imagens
- URLs amigáveis

### Acessibilidade
- Navegação por teclado
- Contraste adequado
- Labels em formulários
- ARIA attributes
- Focus management

## 🚀 Deploy

O projeto está pronto para deploy em qualquer servidor web estático:

- **Netlify**: Arraste a pasta do projeto
- **Vercel**: Conecte o repositório Git
- **GitHub Pages**: Configure nas configurações do repositório
- **Servidor tradicional**: Faça upload via FTP

## 🔮 Próximos Passos

- Integração com API real
- Sistema de autenticação completo
- Dashboard do usuário
- Funcionalidades de reserva
- Testes automatizados
- PWA (Progressive Web App)

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto:
- Email: contato@booksy.com.br
- Website: [booksy.com.br](https://booksy.com.br)

---

**Desenvolvido com ❤️ para o Booksy**
