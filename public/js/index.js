// ================================
// MODAL DE REGISTRO
// ================================
const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

checkLogged();

// ================================
// LOGIN - AUTENTICAR USUÁRIO
// ================================
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const checksession = document.getElementById('session-check').checked;

    const account = getAccount(email);

    if (!account) {
        alert('Opss! Verifique o usuário ou a senha.');
        return;
    }

    if (account.password !== password) {
        alert('Opss! Verifique o usuário ou a senha.');
        return;
    }

    saveSession(email, checksession);
    window.location.href = 'home.html';
});

// ================================
// CRIAR CONTA
// ================================
document.getElementById('create-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email-create-input').value;
    const password = document.getElementById('password-create-input').value;

    if (email.length < 5) {
        alert('Por favor, insira um email válido.');
        return;
    }

    if (password.length < 4) {
        alert('Por favor, preencha a senha com pelo menos quatro (4) dígitos.');
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();
    alert('Conta criada com sucesso!');
});

// ================================
// FUNÇÕES
// ================================

function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session);
        
        window.location.href = 'home.html';
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, remember) {
    if (remember) {
        localStorage.setItem('session', data);
    }

    sessionStorage.setItem('logged', data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return '';
}
