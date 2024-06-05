document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    authenticateUser(email, password);
});

const users = {
    admin: { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    user1: { email: 'user1@example.com', password: 'user123', role: 'user1' },
    user2: { email: 'user2@example.com', password: 'user123', role: 'user2' }
};

function authenticateUser(email, password) {
    for (const userKey in users) {
        const user = users[userKey];
        if (user.email === email && user.password === password) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userRole', user.role);
            redirectUser(user.role);
            return;
        }
    }
    alert('Invalid email or password');
}

function redirectUser(role) {
    if (role === 'admin') {
        window.location.href = 'admin.html';
    } else if (role === 'user1') {
        window.location.href = 'user1.html';
    } else if (role === 'user2') {
        window.location.href = 'user2.html';
    }
}

function checkUserLogin() {
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');
    if (email && role) {
        redirectUser(role);
    }
}

checkUserLogin();
