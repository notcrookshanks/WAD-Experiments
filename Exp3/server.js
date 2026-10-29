const express = require('express')
const mysql = require('mysql2')

const app = express()
const db = mysql.createConnection('mysql://root@localhost:3306/wad')

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.post('/users', (req, res) => {
    db.query('INSERT INTO users (name,email) VALUES (?,?)', [req.body.name, req.body.email], () => res.redirect('/'))
})

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        res.json(result)
    })
})

app.listen(3000, () => {
    console.log('Server started');
});