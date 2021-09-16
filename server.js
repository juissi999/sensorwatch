const express = require('express')
const app = express()

app.use(express.static('./dist/'))


const PORT = 5001
const server = app.listen(PORT)
var io = require('socket.io')(server)
io.sockets.on("connection",(socket)=>{
  console.log(`New connection with id ${socket.id}`)
})


