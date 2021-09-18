const express = require('express')
const app = express()

app.use(express.static('./dist/'))

const PORT = 5000
const POLLING_INTERVAL = 2000

const server = app.listen(PORT)
var io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log(`New connection with id ${socket.id}`)
})

io.on('disconnect', (socket) => {
  console.log(`${socket.id} disconnected`)
})

setInterval(async () => {
  const dp = await getData()
  io.emit('data', dp)
}, POLLING_INTERVAL)

var os = require('os')

const getData = async () => {
  return {
    label: 'Memory usage (%)',
    timestamp: new Date(),
    datapoint: (1 - os.freemem() / os.totalmem()) * 100
  }
}
