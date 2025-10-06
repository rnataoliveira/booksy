// ===== AUTHENTICATION JAVASCRIPT =====

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initAuthForms();
    initPasswordToggle();
    initGoogleAuth();
    initGuestAccess();
    initFormSwitching();
    
    console.log('Auth functionality initialized successfully!');
});

// ===== FORM SWITCHING =====
function initFormSwitching() {
    const forms = {
        login: document.getElementById('login-form'),
        signup: document.getElementById('signup-form'),
        forgotPassword: document.getElementById('forgot-password-form'),
        guest: document.getElementById('guest-form')
    };
    
    const switches = {
        showSignup: document.getElementById('show-signup'),
        showLogin: document.getElementById('show-login'),
        backToLogin: document.getElementById('back-to-login'),
        guestToSignup: document.getElementById('guest-to-signup')
    };
    
    // Show signup form
    if (switches.showSignup) {
        switches.showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            switchForm('signup');
        });
    }
    
    // Show login form
    if (switches.showLogin) {
        switches.showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            switchForm('login');
        });
    }
    
    // Back to login from forgot password
    if (switches.backToLogin) {
        switches.backToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            switchForm('login');
        });
    }
    
    // Guest to signup
    if (switches.guestToSignup) {
        switches.guestToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            switchForm('signup');
        });
    }
    
    // Handle hash-based navigation
    function handleHashNavigation() {
        const hash = window.location.hash.substring(1);
        
        switch (hash) {
            case 'signup':
                switchForm('signup');
                break;
            case 'forgot-password':
                switchForm('forgotPassword');
                break;
            case 'guest':
                switchForm('guest');
                break;
            default:
                switchForm('login');
        }
    }
    
    // Initial hash check
    handleHashNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('a[href="#forgot-password"]');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchForm('forgotPassword');
            window.location.hash = 'forgot-password';
        });
    }
    
    // Guest access link
    const guestAccessLink = document.getElementById('guest-access');
    if (guestAccessLink) {
        guestAccessLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchForm('guest');
            window.location.hash = 'guest';
        });
    }
    
    function switchForm(formName) {
        // Hide all forms
        Object.values(forms).forEach(form => {
            if (form) form.classList.add('hidden');
        });
        
        // Show target form
        if (forms[formName]) {
            forms[formName].classList.remove('hidden');
            
            // Focus first input
            const firstInput = forms[formName].querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
        
        // Update page title
        const titles = {
            login: 'Login - Booksy',
            signup: 'Cadastro - Booksy',
            forgotPassword: 'Recuperar Senha - Booksy',
            guest: 'Acesso Visitante - Booksy'
        };
        
        if (titles[formName]) {
            document.title = titles[formName];
        }
    }
}

// ===== AUTH FORMS =====
function initAuthForms() {
    const loginForm = document.getElementById('login-email-form');
    const signupForm = document.getElementById('signup-email-form');
    const forgotPasswordForm = document.getElementById('forgot-password-email-form');
    
    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(this);
        });
    }
    
    // Signup form
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup(this);
        });
    }
    
    // Forgot password form
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleForgotPassword(this);
        });
    }
    
    // Remember me functionality
    const rememberCheckbox = document.getElementById('remember-me');
    if (rememberCheckbox) {
        // Load saved email if remember me was checked
        const savedEmail = localStorage.getItem('booksy_remembered_email');
        if (savedEmail) {
            const emailInput = document.getElementById('login-email');
            if (emailInput) {
                emailInput.value = savedEmail;
                rememberCheckbox.checked = true;
            }
        }
    }
}

// ===== PASSWORD TOGGLE =====
function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('.form__input-action');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input');
            
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = '🙈';
            } else {
                input.type = 'password';
                this.textContent = '👁️';
            }
        });
    });
}

// ===== GOOGLE AUTHENTICATION =====
function initGoogleAuth() {
    const googleLoginBtn = document.getElementById('google-login');
    const googleSignupBtn = document.getElementById('google-signup');
    
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            handleGoogleAuth('login');
        });
    }
    
    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', function() {
            handleGoogleAuth('signup');
        });
    }
}

// ===== GUEST ACCESS =====
function initGuestAccess() {
    const continueAsGuestBtn = document.getElementById('continue-as-guest');
    
    if (continueAsGuestBtn) {
        continueAsGuestBtn.addEventListener('click', function() {
            handleGuestAccess();
        });
    }
}

// ===== AUTHENTICATION HANDLERS =====

function handleLogin(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Basic validation
    if (!email || !password) {
        showAuthNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Entrando...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Simulate successful login
        if (email && password) {
            // Save email if remember me is checked
            if (remember) {
                localStorage.setItem('booksy_remembered_email', email);
            } else {
                localStorage.removeItem('booksy_remembered_email');
            }
            
            // Save user session (simulated)
            const userData = {
                email: email,
                name: email.split('@')[0],
                loginTime: new Date().toISOString()
            };
            
            sessionStorage.setItem('booksy_user', JSON.stringify(userData));
            
            showAuthNotification('Login realizado com sucesso! Redirecionando...', 'success');
            
            // Redirect to dashboard (simulated)
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showAuthNotification('E-mail ou senha incorretos.', 'error');
        }
    }, 2000);
}

function handleSignup(form) {
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showAuthNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthNotification('As senhas não coincidem.', 'error');
        return;
    }
    
    if (!terms) {
        showAuthNotification('Você deve aceitar os termos de uso.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Criando conta...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Simulate successful signup
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            signupTime: new Date().toISOString()
        };
        
        localStorage.setItem('booksy_pending_user', JSON.stringify(userData));
        
        showAuthNotification('Conta criada com sucesso! Verifique seu e-mail para ativar.', 'success');
        
        // Switch to login form
        setTimeout(() => {
            window.location.hash = 'login';
            form.reset();
        }, 2000);
    }, 2500);
}

function handleForgotPassword(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    
    if (!email) {
        showAuthNotification('Por favor, insira seu e-mail.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        showAuthNotification('Instruções de recuperação enviadas para seu e-mail.', 'success');
        
        // Switch back to login
        setTimeout(() => {
            window.location.hash = 'login';
            form.reset();
        }, 2000);
    }, 2000);
}

function handleGoogleAuth(type) {
    const actionText = type === 'login' ? 'Entrando' : 'Cadastrando';
    
    showAuthNotification(`${actionText} com Google...`, 'info');
    
    // Simulate Google OAuth flow
    setTimeout(() => {
        // Simulate successful Google auth
        const userData = {
            email: 'usuario@gmail.com',
            name: 'Usuário Google',
            provider: 'google',
            loginTime: new Date().toISOString()
        };
        
        sessionStorage.setItem('booksy_user', JSON.stringify(userData));
        
        showAuthNotification(`${type === 'login' ? 'Login' : 'Cadastro'} com Google realizado com sucesso!`, 'success');
        
        // Redirect
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

function handleGuestAccess() {
    showAuthNotification('Entrando como visitante...', 'info');
    
    // Simulate guest access
    setTimeout(() => {
        const guestData = {
            email: 'visitante@booksy.com',
            name: 'Visitante',
            type: 'guest',
            loginTime: new Date().toISOString(),
            limitations: ['limited_features', 'no_data_persistence']
        };
        
        sessionStorage.setItem('booksy_user', JSON.stringify(guestData));
        
        showAuthNotification('Acesso como visitante autorizado!', 'success');
        
        // Redirect
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

// ===== UTILITY FUNCTIONS =====

function showAuthNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.auth-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `auth-notification auth-notification--${type}`;
    notification.innerHTML = `
        <div class="auth-notification__content">
            <span class="auth-notification__icon">${getNotificationIcon(type)}</span>
            <span class="auth-notification__message">${message}</span>
            <button class="auth-notification__close">&times;</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideAuthNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.auth-notification__close');
    closeButton.addEventListener('click', () => {
        hideAuthNotification(notification);
    });
}

function hideAuthNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    return icons[type] || icons.info;
}

// ===== PASSWORD STRENGTH CHECKER =====
function initPasswordStrength() {
    const passwordInputs = document.querySelectorAll('input[type="password"][name="password"]');
    
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            const strength = checkPasswordStrength(this.value);
            showPasswordStrength(this, strength);
        });
    });
}

function checkPasswordStrength(password) {
    let score = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[^A-Za-z0-9]/.test(password)
    };
    
    Object.values(checks).forEach(check => {
        if (check) score++;
    });
    
    if (score < 2) return { level: 'weak', text: 'Fraca', color: '#ef4444' };
    if (score < 4) return { level: 'medium', text: 'Média', color: '#f59e0b' };
    return { level: 'strong', text: 'Forte', color: '#10b981' };
}

function showPasswordStrength(input, strength) {
    let strengthIndicator = input.parentNode.parentNode.querySelector('.password-strength');
    
    if (!strengthIndicator) {
        strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';
        input.parentNode.parentNode.appendChild(strengthIndicator);
    }
    
    strengthIndicator.innerHTML = `
        <div class="password-strength__bar">
            <div class="password-strength__fill" style="width: ${strength.level === 'weak' ? '33%' : strength.level === 'medium' ? '66%' : '100%'}; background-color: ${strength.color}"></div>
        </div>
        <span class="password-strength__text" style="color: ${strength.color}">${strength.text}</span>
    `;
}

// Initialize password strength checker
document.addEventListener('DOMContentLoaded', function() {
    initPasswordStrength();
});

// ===== SESSION MANAGEMENT =====
function checkAuthStatus() {
    const user = sessionStorage.getItem('booksy_user');
    
    if (user) {
        const userData = JSON.parse(user);
        
        // If user is already logged in, redirect to dashboard
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
        
        return userData;
    }
    
    return null;
}

function logout() {
    sessionStorage.removeItem('booksy_user');
    localStorage.removeItem('booksy_remembered_email');
    window.location.href = 'login.html';
}

// Check auth status on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = checkAuthStatus();
    
    if (currentUser) {
        console.log('User is logged in:', currentUser);
    }
});
