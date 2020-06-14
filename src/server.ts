import express from 'express'
import httpFactory from 'http'
import socketFactory from 'socket.io'

const app = express()
const server = httpFactory.createServer(app)
const io = socketFactory(server)

app.get('/', (request, response) =>
  response.sendFile(`${__dirname}/static/index.html`)
)

const messages: string[] = []
const typing: string[] = []

io.on('connection', (socket) => {
  socket.emit('history', messages)

  socket.on('chat message', (message) => {
    messages.push(message)
    socket.broadcast.emit('new chat message', message)
  })
})

server.listen(3001, () => console.log(`
  Servidor iniciado na porta 3001
`))
