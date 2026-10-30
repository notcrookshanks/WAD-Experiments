
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

app.post('/sql', (req, res) => {
    const username = req.body.username;
    db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, result) => {
            if (err) return res.send('Database Error');
            res.json(result);
        }
    );
});

app.get('/xss', (req, res) => {
    const name = req.query.name || '';
    const safeName = name
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    res.send('<h2>Hello ' + safeName + '</h2>');
});

app.get('/csrf', (req, res) => {
    req.session.token = crypto.randomBytes(32).toString('hex');
    res.send(`
        <form method="POST" action="/csrf">
            <input type="hidden" name="token"
            value="${req.session.token}">
            <input name="message" placeholder="Message">
            <button>Submit</button>
        </form>
    `);
    console.log(req.session.token)
});

app.post('/csrf', (req, res) => {
    if (!req.session.token ||
        req.body.token !== req.session.token) {
        return res.send('CSRF Attack Detected!');
    }
    req.session.token = null;
    res.send('CSRF Protection Successful!');
});
app.get('/secure', (req, res) => {
    req.session.token = crypto.randomBytes(32).toString('hex');
    res.send(`
        <form method="POST" action="/secure">
            <input type="hidden" name="token"
            value="${req.session.token}">
            <input name="username" placeholder="Username">
            <button>Submit</button>
        </form>
    `);
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
