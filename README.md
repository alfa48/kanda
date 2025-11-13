# 📁 Kanda - Estrutura Completa do Projeto

## 🗂️ Estrutura de Pastas

```
edupath-angola/
│
├── index.html                 # Página inicial
├── courses.html              # Página de cursos
├── course-detail.html        # Detalhes do curso
├── hall-of-fame.html         # Hall da Fama
├── about.html                # Sobre nós
├── contact.html              # Contacto
├── login.html                # Login
├── register.html             # Registro
├── dashboard.html            # Dashboard do aluno
├── teacher-dashboard.html    # Dashboard do professor
├── profile.html              # Perfil do usuário
├── blog.html                 # Blog
├── privacy.html              # Política de privacidade
├── terms.html                # Termos de uso
│
├── css/
│   ├── styles.css            # Estilos principais
│   ├── responsive.css        # Estilos responsivos
│   ├── dashboard.css         # Estilos do dashboard
│   └── animations.css        # Animações extras
│
├── js/
│   ├── main.js               # JavaScript principal
│   ├── dashboard.js          # Funcionalidades do dashboard
│   ├── charts.js             # Gráficos e estatísticas
│   └── api.js                # Chamadas API (futuro)
│
├── images/
│   ├── logo.svg              # Logo da plataforma
│   ├── hero-bg.jpg           # Imagem de fundo hero
│   ├── universities/         # Logos das universidades
│   ├── badges/               # Insígnias e medalhas
│   ├── avatars/              # Avatares de usuários
│   └── courses/              # Imagens dos cursos
│
├── fonts/                    # Fontes personalizadas (opcional)
│
└── assets/
    ├── icons/                # Ícones SVG
    └── documents/            # PDFs, certificados, etc.
```

---

## 📄 Páginas Necessárias (Resumo)

### ✅ Já Criadas
1. **index.html** - Página inicial com Hero, Features, CTA
2. **styles.css** - Estilos principais completos
3. **responsive.css** - Design responsivo mobile-first
4. **main.js** - JavaScript com menu mobile, scroll, validações

### 🔜 A Criar

#### **Páginas Públicas**
- `courses.html` - Listagem de todos os cursos
- `course-detail.html` - Detalhes de um curso específico
- `hall-of-fame.html` - Ranking de alunos, professores e universidades
- `about.html` - Sobre o EduPath Angola
- `contact.html` - Formulário de contacto
- `blog.html` - Artigos e notícias

#### **Autenticação**
- `login.html` - Formulário de login
- `register.html` - Formulário de registro (Aluno/Professor)

#### **Área do Aluno**
- `dashboard.html` - Dashboard do aluno
  - Cursos em progresso
  - Pontos e níveis
  - Conquistas e insígnias
  - Desafios ativos
- `profile.html` - Perfil e configurações
- `my-courses.html` - Meus cursos
- `achievements.html` - Minhas conquistas

#### **Área do Professor**
- `teacher-dashboard.html` - Dashboard do professor
  - Criar/editar cursos
  - Estatísticas de alunos
  - Avaliações
- `create-course.html` - Criar novo curso
- `students.html` - Lista de alunos

#### **Legais**
- `privacy.html` - Política de privacidade
- `terms.html` - Termos de uso
- `cookies.html` - Política de cookies

---

## 🎨 Paleta de Cores

```css
--primary: #6366f1       /* Azul principal */
--primary-dark: #4f46e5  /* Azul escuro */
--secondary: #ec4899     /* Rosa */
--success: #10b981       /* Verde sucesso */
--warning: #f59e0b       /* Amarelo aviso */
--danger: #ef4444        /* Vermelho perigo */
--dark: #1e293b          /* Cinza escuro */
--gray: #64748b          /* Cinza médio */
--light-gray: #f1f5f9    /* Cinza claro */
--white: #ffffff         /* Branco */
```

---

## 🚀 Como Usar

### 1. **Estrutura Básica**
```bash
# Criar pasta do projeto
mkdir edupath-angola
cd edupath-angola

# Criar subpastas
mkdir css js images assets
mkdir images/universities images/badges images/avatars images/courses
mkdir assets/icons assets/documents
```

### 2. **Copiar os Arquivos**
- Colar `index.html` na raiz
- Colar `styles.css` em `/css/`
- Colar `responsive.css` em `/css/`
- Colar `main.js` em `/js/`

### 3. **Abrir no Navegador**
```bash
# Simplesmente abrir index.html
# OU usar servidor local:
python -m http.server 8000
# Aceder: http://localhost:8000
```

---

## 📱 Páginas Responsivas

Todas as páginas são totalmente responsivas:
- **Desktop**: Layout completo com sidebar
- **Tablet** (≤1024px): Layout adaptado
- **Mobile** (≤768px): Menu hamburguer, layout em coluna
- **Small Mobile** (≤480px): Otimizado para telas pequenas

---

## 🎯 Próximos Passos

### Fase 1 - Frontend Estático ✅
- [x] Página inicial
- [x] CSS completo
- [x] JavaScript básico
- [ ] Criar páginas restantes

### Fase 2 - Páginas Internas
- [ ] Dashboard do aluno
- [ ] Dashboard do professor
- [ ] Hall da Fama
- [ ] Listagem de cursos

### Fase 3 - Backend (Futuro)
- [ ] API REST
- [ ] Autenticação JWT
- [ ] Base de dados (PostgreSQL/MongoDB)
- [ ] Sistema de pontos e níveis

### Fase 4 - Features Avançadas
- [ ] Videoaulas com player customizado
- [ ] Chat em tempo real
- [ ] Notificações push
- [ ] App mobile (React Native)

---

## 🔧 Tecnologias Utilizadas

### Frontend
- HTML5 Semântico
- CSS3 (Grid, Flexbox, Animations)
- JavaScript ES6+ (Vanilla)

### Futuro Backend
- Node.js + Express
- PostgreSQL / MongoDB
- JWT Authentication
- Socket.io (chat)

---

## 💡 Dicas de Desenvolvimento

### **Código Limpo**
```javascript
// Use nomes descritivos
const studentDashboard = document.querySelector('.dashboard');

// Evite magic numbers
const NAVBAR_HEIGHT = 80;
const ANIMATION_DURATION = 300;
```

### **Performance**
```javascript
// Use debounce para scroll/resize
const handleScroll = debounce(() => {
    // seu código
}, 100);
```

### **Acessibilidade**
```html
<!-- Sempre use alt em imagens -->
<img src="logo.svg" alt="EduPath Angola Logo">

<!-- Use aria-labels em botões -->
<button aria-label="Abrir menu">☰</button>
```

---

## 📞 Suporte

Se precisares de ajuda:
1. Verifica a documentação no código
2. Testa em diferentes navegadores
3. Usa DevTools (F12) para debug

---

## 🎓 Recursos Úteis

- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [JavaScript.info](https://javascript.info)
- [Can I Use](https://caniuse.com)

---

**Criado com ❤️ para Kanda**
*Versão 1.0 - Novembro 2024*# kanda
