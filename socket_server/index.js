const io = require('socket.io')(9000)
io.sockets.on('connect', socket => {
  console.log('connection')
  socket.on('joined', room => {
    console.log('joined')
    socket.join(room)
    let users = Object.keys(io.sockets.in(room).connected).filter(
      id => id !== socket.id
    )
    console.log(users)
    if (users.length > 0) {
      users = users.map(user => {
        return { id: user, name: 'test' }
      })
      console.log(users)
      console.log('sending users')
      socket.emit('users', users)
      socket.broadcast.emit('joined', { id: socket.id, name: 'test' })
    }
  })
  socket.on('offer', (message, toId) => {
    console.log(message.type, 'offer')
    socket.to(toId).emit('offer', message, socket.id)
  })
  socket.on('ready', () => socket.broadcast.emit('ready', socket.id))
  socket.on('answer', (message, toId) =>
    socket.to(toId).emit('answer', message, socket.id)
  )
  socket.on('candidate', (message, toId) =>
    socket.to(toId).emit('candidate', message, socket.id)
  )

  socket.on('message', message =>
    socket.broadcast.emit('message', message, socket.id)
  )

  socket.on('find', message => {
    io.sockets.in('test').emit('rooms', 'hi')
  })

  socket.on('disconnect', e => {
    socket.disconnect(true)
    socket.broadcast.emit('userleft', socket.id)
  })
})
