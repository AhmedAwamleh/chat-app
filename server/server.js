require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json())
const userRouter = require('./routes/use.routes')



app.get('/', (req, res) => {
  res.send('Hello World!');
});

const socketIo = require('socket.io')
const http = require('http');
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['Get', 'POST']

  },
});

io.on('connection', (socket) => {
  console.log(`user with ${socket.id} connected`)
  socket.on('disconnect', () => {
    console.log(`user with ${socket.id} disconnected`)
  })
  socket.on('join', (data) => {
    socket.join(data)
    console.log(`user with ${socket.id} join room in room ${data}`)
  })
  socket.on('sendMessage', (data) => {
    socket.to(data.room).emit('getMessage', data)
  })
})

const start = (port) => {
  server.listen(port, () => console.log(`hello from server on ${port}`))
}
module.exports = {
  start,
  app
}





