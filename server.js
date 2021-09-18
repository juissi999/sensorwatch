const express = require('express')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const PORT = 5000
const POLLING_INTERVAL = 2000
const DBFILE = 'db.json'
const DPCOUNT = 100

// database init
const adapter = new FileSync(DBFILE)
const db = lowdb(adapter)

// database initialization
db.defaults({ datapoints: [] }).write()

// server
const app = express()
app.use(express.static('./dist/'))

const server = app.listen(PORT)
var io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log(`New connection with id ${socket.id}`)
  //socket.emit('data', db.get('datapoints'))
})

io.on('disconnect', (socket) => {
  console.log(`${socket.id} disconnected`)
})

setInterval(async () => {
  const dp = await getData()
  //io.emit('data', [dp])
  const dpArray = db.get('datapoints').value()
  io.emit('data', dpArray.slice(Math.max(dpArray.length - DPCOUNT, 0)))
  db.get('datapoints').push(dp).write()
}, POLLING_INTERVAL)

var os = require('os')

const getData = async () => {
  return {
    label: 'Memory usage (%)',
    timestamp: new Date(),
    datapoint: (1 - os.freemem() / os.totalmem()) * 100
  }
}
