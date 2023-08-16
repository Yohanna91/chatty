// Importera in express (Steg 1)
const express = require("express")
const app = express();
const PORT = 4000;

// Importera in resterande packages (Steg 2)
const http = require("http").Server(app)
const cors = require("cors")

// Se till att applikationen använder cors! (Steg 3)
app.use(cors())

// Konfigurera Socket io (Steg 4)
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "*" // * = är en wildcard accepterar alla domäner
    }
})

// Avlyssna första händelse med socket io vanligtvis "connection"
// Varje connection blir en "socket" vilket är klienten.
socketIO.on("connection", function(socket) {
    console.log("Hey! Someone just joined the chat!")
    socket.on("disconnect", function() {
        console.log("User disconnected... hope he comes back :(")
    })
})

// Skapa en endpoint
app.get("/", function(req, res) {
    res.send("Hello!")
})

// Starta servern och lyssna på angiven PORT
http.listen(PORT, function() {
    console.log("Server lyssnar på PORT 4000")
})