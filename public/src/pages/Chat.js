import { React, useState, useEffect } from "react";
import Scrole from 'react-scroll-to-bottom'
import "../App.css";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleMessage = async () => {
    if (message) {
      const messageData = {
        room: room,
        username: username,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      socket.emit('sendMessage', messageData)
      setMessages((list) => [...list, messageData])
      setMessage("")
    }
  }
  useEffect(() => {
    socket.on('getMessage', (data) => {
      setMessages((list) => [...list, data])
    })
  }, [socket])
  return (
    <div className="chat-window">


      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      <div className="chat-body">
        <Scrole className="message-container">
          {messages.map((msg) => {
            return (
              <div className="message" id={username === msg.username ? "you" : "other"}>

                <div>
                  <div className="message-content">
                    <p>{msg.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id={"time"}>{msg.time}</p>
                    <p id={"username"}>{msg.username}</p>
                  </div>
                </div>

              </div>

            )
          })

          }
        </Scrole>
      </div>

      <div className="chat-footer">
        <input type="text" value={message} placeholder="write your message" onChange={(e) => { setMessage(e.target.value) }} />
        <button onClick={handleMessage}>Send</button>
      </div>
    </div>

  )
}




export default Chat;