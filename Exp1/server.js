const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("Hedwig")
});

app.listen(3000, () => {
    console.log("Server started")
})