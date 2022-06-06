import { io } from 'socket.io-client';

const profile = document.getElementById('user-id')
const form = document.getElementById('form')
const messageInput = document.getElementById('message-input')

const ip = '10.151.1.50'

const socket = io(`http://${ip}:3000`)

socket.on('connect', () => {
  display_user_profile(socket.id)
  socket.emit('online')
})

socket.on('get-msg', (msg, id) => {
  display_other_msg(`${id}: ${msg}`)
})

socket.on('get-online-list', (online_list) => {
  display_online_list(`Online: ${online_list}`)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const msg = messageInput.value
  if (msg === '')
    return
  let id = socket.id.substring(0, 6)
  display_self_msg(`${id}: ${msg}`)
  socket.emit('send-msg', msg, id)
  messageInput.value = ''
})

function display_user_profile(id) {
  let user_id = id.substring(0, 6)
  profile.textContent = `Your ID -> [${user_id}]`
}

function display_online_list(online_list) {
  document.getElementById('online-list').textContent = online_list
}

function display_other_msg(msg) {
  const div = document.createElement('li')
  div.textContent = msg
  document.getElementById('message-container').append(div)
}

function display_self_msg(msg) {
  const div = document.createElement('li')
  div.textContent = msg
  div.style.cssText = 'list-style: square;'
  document.getElementById('message-container').append(div)
}
