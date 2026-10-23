// ===== STORAGE (replaces MySQL) =====
const STORAGE_KEY = 'users';
const COUNTER_KEY = 'users_next_id';

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getNextId() {
    const users = getUsers();
    const maxId = users.reduce((max, u) => Math.max(max, u.id), 0);
    const stored = parseInt(localStorage.getItem(COUNTER_KEY), 10) || 1;
    const next = Math.max(stored, maxId + 1);
    localStorage.setItem(COUNTER_KEY, String(next + 1));
    return next;
}

function escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ===== DARK MODE =====
const toggle = document.getElementById('darkModeToggle');

function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    toggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

toggle.addEventListener('click', function () {
    const isDark = document.body.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});