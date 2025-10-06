# 🚀 Instruções de Deploy - Booksy Landing Page

## 📋 Resumo

O projeto Booksy está pronto e configurado para ser enviado ao seu repositório GitHub. Como a autenticação interativa no ambiente sandbox apresentou limitações, aqui estão as instruções para completar o deploy.

## 🔧 Opção 1: Deploy Manual (Recomendado)

### Passo 1: Baixar o Projeto
- Baixe o arquivo `booksy-landing-complete.zip` 
- Extraia em seu computador local

### Passo 2: Configurar Git Local
```bash
cd booksy-landing
git init
git branch -m main
git add .
git commit -m "🚀 Initial commit: Complete Booksy landing page"
git remote add origin https://github.com/rnataoliveira/booksy.git
```

### Passo 3: Autenticação GitHub
1. Vá para: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Selecione os escopos: `repo`, `workflow`
4. Copie o token gerado

### Passo 4: Push para GitHub
```bash
git push -u origin main
```
- Username: `rnataoliveira`
- Password: `[seu token de acesso pessoal]`

## 🔧 Opção 2: Usando GitHub CLI

### Instalar GitHub CLI
```bash
# Windows (usando winget)
winget install GitHub.cli

# macOS (usando Homebrew)
brew install gh

# Linux (Ubuntu/Debian)
sudo apt install gh
```

### Autenticar e Push
```bash
cd booksy-landing
gh auth login
git push -u origin main
```

## 🔧 Opção 3: Usando GitHub Desktop

1. Baixe e instale o GitHub Desktop
2. Clone seu repositório: `https://github.com/rnataoliveira/booksy.git`
3. Copie todos os arquivos do projeto para a pasta clonada
4. Faça commit e push através da interface gráfica

## 📁 Estrutura do Projeto

```
booksy-landing/
├── index.html              # Landing page principal
├── login.html              # Página de autenticação
├── about.html              # Página sobre/missão
├── css/
│   ├── main.css            # Estilos base
│   ├── components.css      # Componentes
│   └── responsive.css      # Responsividade
├── js/
│   ├── main.js             # Funcionalidades principais
│   ├── auth.js             # Autenticação
│   └── components.js       # Componentes JS
├── assets/                 # Recursos
├── README.md              # Documentação
├── DEMO.md                # Guia de demonstração
└── deploy.sh              # Script de deploy
```

## 🌐 Configuração do GitHub Pages

Após o push, configure o GitHub Pages:

1. Vá para: `https://github.com/rnataoliveira/booksy/settings/pages`
2. Em "Source", selecione "Deploy from a branch"
3. Escolha "main" branch e "/ (root)"
4. Clique em "Save"

Seu site estará disponível em: `https://rnataoliveira.github.io/booksy/`

## ✅ Verificação

Após o deploy, verifique:
- [ ] Todos os arquivos foram enviados
- [ ] GitHub Pages está configurado
- [ ] Site está acessível online
- [ ] Todas as páginas funcionam corretamente
- [ ] Design responsivo está funcionando

## 🆘 Solução de Problemas

### Erro de Autenticação
- Certifique-se de usar um token de acesso pessoal, não sua senha
- Verifique se o token tem as permissões corretas

### Arquivos Não Aparecem
- Verifique se todos os arquivos foram adicionados com `git add .`
- Confirme o commit com `git status`

### GitHub Pages Não Funciona
- Aguarde alguns minutos após o primeiro push
- Verifique as configurações em Settings > Pages
- Certifique-se de que o repositório é público

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o repositório existe: https://github.com/rnataoliveira/booksy
2. Confirme suas permissões de escrita no repositório
3. Tente usar GitHub Desktop como alternativa

---

**O projeto está 100% pronto para deploy! 🎉**
