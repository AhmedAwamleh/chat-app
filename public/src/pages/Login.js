'use strict'
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Chat from "./Chat";



function Login(props) {
  const [users, setUsers] = useState([])
  const [showUsers, setshowUser] = useState(false)




  const handelLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value

    const user = await axios.post('http://localhost:3008/user', { username })


    handelgetUsers()
  }

  const handelgetUsers = async () => {
    const user = await axios.get('http://localhost:3008/user')
    setUsers(user.data)
    setshowUser(true)

  }
  useEffect(() => {
    handelgetUsers()

  }, [])


  return (

    <div>

      <form onSubmit={handelLogin}>
        <div calssname="login">
          <input type="text" name="username" placeholder="input username" />
          <button type="submit">Log In</button>
          <Chat />
        </div>

      </form>

      {users &&
        users.map((user, idx) => {
          return (
            <div key={idx} >

            </div>
          )
        })
      }
    </div >

  )

}

export default Login;