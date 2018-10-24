const io = require('socket.io')(9000)
io.sockets.on('connect', socket => {
  socket.on('joined', (room, name) => {
    socket.join(room)

    let users = Object.keys(io.sockets.adapter.rooms[room].sockets).filter(
      id => id !== socket.id
    )

    if (users.length > 0) {
      users = users.map(user => {
        return { id: user, name }
      })
      socket.emit('users', users)
      socket.to(room).emit('joined', { id: socket.id, name })
    }
  })
  socket.on('offer', (message, toId) => {
    io.sockets.to(toId).emit('offer', message, socket.id)
  })
  socket.on('ready', () => {
    socket
      .to(Object.keys(socket.rooms).filter(item => item !== socket.id)[0])
      .emit('ready', socket.id)
  })
  socket.on('answer', (message, toId) => {
    io.to(toId).emit('answer', message, socket.id)
  })
  socket.on('candidate', (message, toId) =>
    io.to(toId).emit('candidate', message, socket.id)
  )

  socket.on('message', message =>
    socket
      .to(Object.keys(socket.rooms).filter(item => item !== socket.id)[0])
      .emit('message', message, socket.id)
  )

  socket.on('find', message => {})

  socket.on('disconnect', () => {
    const room = socket.handshake.headers.referer.split('/')
    socket.to(room[room.length - 1]).emit('userleft', socket.id)
    socket.leaveAll()
  })
})
