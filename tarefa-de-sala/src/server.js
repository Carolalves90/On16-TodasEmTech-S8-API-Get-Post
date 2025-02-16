
const filmesJson = require('./model/filmes.json')
const express = require('express')
const { request, response } = require('express')
const app = express()

app.use(express.json())

app.listen(8080, () => {
    console.log('Servidor na porta 8080')
})

app.get("/", (request, response) => {
    response.status(200).json([
        {
            "message": "Deu certo, API Filmes da Barbie"
        }
    ])
})

app.get("/filmes", (request, response) => {
    response.status(200).send(filmesJson)
})

app.get("/filmes/buscar/:id", (request, response) => {
    
    let idRequest = request.params.id

    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)
})

app.get("/filmes/filtro", (request, response) => {

    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)

    let filmeEncontrado = filmesJson.filter(
        filme => filme.title.toLocaleLowerCase().includes(tituloRequest)
    )
    response.status(200).send(filmeEncontrado)
});

app.post("/filmes", (request, response) =>{

    let tituloRequest = request.body.title
    let descricaoRequest = request.body.content
    
    let novoFilme = {
        id: (filmesJson.length) + 1,
        topic: topicRequest,
        title: tituloRequest,
        content: descricaoRequest
    } 

    filmesJson.push(novoFilme)

    response.status(201).json(
        [{
            "message": "Seu filme foi cadastrado",
            novoFilme
        }]
    )
})