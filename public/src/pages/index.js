import { React, useState } from 'react'
import Chat from './Chat'
import "../App.css";
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3008')



function ChatApp() {
  const [username, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [data, setData] = useState('false')

  const Join = () => {
    if (username && room) {
      socket.emit('join', room)
      setData('true')
    } else {
      alert('you need to enter room number')
    }
  }

  return (
    <div className="ChatApp">
      {data == "false" ? (
        <div className="joinChatContainer">
          <h3>Chat whooo!</h3>
          <input type="text" placeholder='User Name' onChange={(e) => { setUserName(e.target.value) }} />
          <input type="text" placeholder='Room ID' onChange={(e) => { setRoom(e.target.value) }} />
          <button onClick={Join}>start chat</button>
        </div>
      )
        : (
          <Chat socket={socket} username={username} room={room} />
        )
      }
    </div >

  )
}

export default ChatApp
