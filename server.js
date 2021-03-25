const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const socket = require('./socket')
const config = require('./config')
const router = require('./network/route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
socket.connect(server)
router(app)

app.use(config.publicRoute, express.static('public'))
server.listen( config.port, function() {
    console.log('La aplicación está escuchando en http://localhost:' + config.port)
})