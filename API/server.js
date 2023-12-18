const { Server } = require("socket.io")

const io = new Server(8080, {
    cors: true
})

const emailToID = new Map()
const IDtoEmail = new Map()

io.on("connection", (socket) => {
    console.log(`Socket connected : ${socket.id}`)
    socket.on('room:join', data => {
        const { email, roomID } = data

        emailToID.set(email, socket.id)
        IDtoEmail.set(socket.id, email)
        io.to(roomID).emit('user:joined', { email, id: socket.id });
        socket.join(roomID)
        io.to(socket.id).emit("room:join", data)
    })
}) 