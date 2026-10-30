const express = require('express')
const cors = require('cors')

const app = express()

blogs=[
    {
    'id' : 1,
    'blog' : 'Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet',
    'author' : 'Bala Sudalaimuthu'
}
]

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// app.use('/', (req, res) => {
//     res.send('Welcome to Blog app')
// })

app.get('/blogs', (req, res) => {
    res.send(blogs)
})

app.post('/blogs', (req, res) => {
    const newBlog = {
        id : blogs.length + 1,
        blog: req.body.blog,
        author: req.body.author
    }
    blogs.push(newBlog)
    res.redirect('http://127.0.0.1:5500/Exp8')
})

app.listen(3000, () => {
    console.log('Server started')
})