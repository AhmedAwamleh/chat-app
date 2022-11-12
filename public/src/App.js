import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ChatApp from "./pages";
import Chat from './pages/Chat'
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <ChatApp />
    </div>
  );
}

export default App;
