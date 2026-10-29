const express = require('express')
const mysql = require('mysql2')

const db = mysql.createConnection('mysql://root@127.0.0.1:3306/wad')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Welcome to Comments')
})

app.get('/comments', (req, res) => {
    db.query('SELECT * FROM comments', (err, result) => {
        res.send(result)
    })
})

app.post('/comments', (req, res) => {
    db.query('INSERT INTO comments (message) VALUES (?)', [req.body.comment], () => {
        res.redirect('/')
    })
})

app.post('/update', (req, res) => {
    db.query('UPDATE comments SET message=(?) WHERE id=?', [req.body.message, req.body.id], () => {
        res.redirect('/')
    })
})

app.post('/users', (req, res) => {
    db.query("DELETE FROM users WHERE id = (?)", [req.body.id], () => {
        res.redirect('/')
    })
})

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000')
})