const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Registration
app.post('/register', async (req, res) => {
    let users = JSON.parse(fs.readFileSync('data.json'));
    const { username, password } = req.body;

    if (users.find(u => u.username === username))
        return res.send('User already exists!');

    const hash = await bcrypt.hash(password, 10);
    users.push({ username, password: hash });

    fs.writeFileSync('data.json', JSON.stringify(users, null, 2));
    res.send('Registration successful!');
});

app.post('/login', async (req, res) => {
    let users = JSON.parse(fs.readFileSync('data.json'));
    const user = users.find(u => u.username === req.body.username);

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.user = user.username;
        res.send('Login successful');
    } else {
        res.send('Invalid username or password!');
    }
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/');
    res.send('Welcome');
});

app.listen(3000, () => {
    console.log('Server started');
});
