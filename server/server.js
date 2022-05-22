const ip = '10.151.1.50'

const io = require('socket.io')(3000, {
  cors: {
    origin: [
      `http://${ip}:8080`
    ]
  }
});

io.on('connection', (socket) => {
  socket.on('send-msg', (msg, user_id) => {
    socket.broadcast.emit('receive-msg', msg, user_id);
  })

  socket.on('disconnect', () => {
    return_online_list()
  })

  socket.on('online', () => {
    return_online_list()
  })
})

function return_online_list() {
  const user_id_list = []
  io.allSockets().then(items => {
    items.forEach(item => {
      user_id_list.push(item.substring(0, 6))
    })
    io.emit('receive-online-list', user_id_list)
  })
}
