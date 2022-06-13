import { io } from 'socket.io-client';

const profile = document.getElementById('profile')
const msg_input = document.getElementById('msg-input')

const ip = 'xxx.xxx.xxx.xxx'
const socket = io(`http://${ip}:3000`)

socket.on('connect', () => {
  display_user_id(socket.id)
  socket.emit('online')
})

socket.on('get-msg', (msg, user_id) => {
  display_msg(`${user_id}: ${msg}`)
})

socket.on('get-online-list', (online_list) => {
  display_online_list(`Online: ${online_list}`)
})

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const msg = msg_input.value
  if (msg === '') return
  let id = socket.id.substring(0, 6)
  display_msg(`${id}: ${msg}`)
  socket.emit('send-msg', msg, id)
  msg_input.value = ''
})

function display_user_id(id) {
  let user_id = id.substring(0, 6)
  profile.textContent = `Your ID -> [ ${user_id} ]`
}

function display_online_list(online_list) {
  document.getElementById('online-list').textContent = online_list
}

function display_msg(msg) {
  const li = document.createElement('li')
  li.textContent = msg
  document.getElementById('msg-list').append(li)
}
