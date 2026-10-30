const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.urlencoded({ extended: true }));

let users = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    users.push({ username, password: hash });

    console.log(users);
    res.send('Registration successful!');
});

// Login
app.post('/login', async (req, res) => {
    const user = users.find(u => u.username === req.body.username);

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.send('Login successful!');
    } else {
        res.send('Invalid username or password!');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
