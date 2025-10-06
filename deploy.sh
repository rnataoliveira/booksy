#!/bin/bash

# Booksy Landing Page - Deploy Script
# Este script ajuda a fazer o deploy do projeto para o GitHub

echo "🚀 Booksy Landing Page - Deploy Script"
echo "======================================"
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "index.html" ]; then
    echo "❌ Erro: Execute este script no diretório do projeto Booksy"
    exit 1
fi

echo "📁 Diretório atual: $(pwd)"
echo "📋 Arquivos do projeto:"
ls -la

echo ""
echo "🔧 Configurando Git..."

# Verificar se é um repositório Git
if [ ! -d ".git" ]; then
    echo "📦 Inicializando repositório Git..."
    git init
    git branch -m main
fi

# Configurar usuário Git (você pode alterar estes valores)
echo "👤 Configurando usuário Git..."
git config user.name "rnataoliveira"
git config user.email "rnataoliveira@users.noreply.github.com"

# Adicionar arquivos
echo "📝 Adicionando arquivos..."
git add .

# Verificar status
echo "📊 Status do repositório:"
git status

# Fazer commit se houver mudanças
if git diff --staged --quiet; then
    echo "✅ Nenhuma mudança para commit"
else
    echo "💾 Fazendo commit..."
    git commit -m "🚀 Deploy: Booksy landing page complete

✨ Features:
- Responsive landing page with hero section
- Login/signup pages with authentication flows
- About/mission page with team information
- Modern CSS with design system
- Interactive JavaScript with form validation
- Mobile-first responsive design

📱 Pages included:
- index.html: Main landing page
- login.html: Authentication flows
- about.html: Company information and contact

🎨 Technical highlights:
- CSS variables and component architecture
- Smooth animations and transitions
- Form validation and user feedback
- Cross-browser compatibility"
fi

# Configurar remote se não existir
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Adicionando repositório remoto..."
    git remote add origin https://github.com/rnataoliveira/booksy.git
fi

echo ""
echo "🌐 Repositório remoto configurado:"
git remote -v

echo ""
echo "📤 Para fazer o push para o GitHub, execute:"
echo "   git push -u origin main"
echo ""
echo "💡 Se for a primeira vez, você precisará se autenticar:"
echo "   - Username: rnataoliveira"
echo "   - Password: seu token de acesso pessoal do GitHub"
echo ""
echo "🔑 Para criar um token de acesso:"
echo "   1. Vá para: https://github.com/settings/tokens"
echo "   2. Clique em 'Generate new token (classic)'"
echo "   3. Selecione os escopos: repo, workflow"
echo "   4. Use o token como senha"
echo ""
echo "✅ Script concluído! O projeto está pronto para deploy."
