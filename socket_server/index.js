const io = require('socket.io')(9000)

io.sockets.on('connection', socket => {
  // sending to all clients in the room (channel) except sender
  socket.on('joined', message => socket.broadcast.emit('joined', message))
  socket.on('offer', (message, toId) =>
    socket.to(toId).emit('offer', message, socket.id)
  )
  socket.on('answer', (message, toId) =>
    socket.to(toId).emit('answer', message, socket.id)
  )
  socket.on('candidate', (message, toId) =>
    socket.to(toId).emit('candidate', message, socket.id)
  )

  socket.on('message', message =>
    socket.broadcast.emit('message', message, socket.id)
  )

  socket.on('disconnect', e => socket.broadcast.emit('userleft', socket.id))
})
