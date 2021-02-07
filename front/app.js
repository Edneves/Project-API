const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

// App
const app = express()

// Body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// Template
app.engine('handlebars', expressHandlebars({defaultLayout : 'principal'}))
app.set('view engine', 'handlebars')

// Especificar arquivos estáticos
app.use(express.static(__dirname + '/publico'))

// Rotas
app.get('/', (req, res) => {
    fetch('http://localhost:3000/clientes', {method: 'GET'})
    .then(response => response.json())
    .then(response => res.render('inicio', {dados:response}))
    
    
})

app.post('/cadastrar', (req, res) => {
    let nome = req.body.nome
    let idade = req.body.idade

    let dados = {'nome':nome, 'idade':idade}

    fetch('http://localhost:3000/clientes', {
        method:'POST',
        body:JSON.stringify(dados),
        headers:{'Content-Type':'application/json'}
    })
    .then(res.redirect('/'))
})

app.get('/selecionar/:id', (req,res) => {
    let id = req.params.id

    fetch('http://localhost:3000/clientes/'+id, {method: 'GET'})
    .then(response => response.json())
    .then(response => res.render('selecionar', {dados:response}))
})

app.post('/editar', (req, res) => {
    let nome = req.body.nome
    let idade = req.body.idade
    let id = req.body.id

    fetch('http://localhost:3000/clientes/'+id, {
        method: 'PUT',
        body:JSON.stringify({'nome':nome, 'idade':idade}),
        headers:{'Content-Type':'application/json'}
    })
    .then(res.redirect('/'))
})

app.get('/remover/:id', (req, res) => {
    let id = req.params.id

    fetch('http://localhost:3000/clientes/'+id, {method: 'DELETE'})
    .then(res.redirect('/'))
})

// Servidor
app.listen(8080)