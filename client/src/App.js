import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat.js';

const socket = io.connect("http://localhost:3001"); // connects to server/back-end components

function App() {
  // sets state for username and chatroom
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
    }
  };

  return (
    <div className="App">
      <h3>Join a Chat</h3>
      <input 
        type="text" 
        placeholder="Name" 
        onChange = {(event) => { 
          setUsername(event.target.value);
        }} 
      />
      <input 
        type="text" 
        placeholder="Room ID" 
        onChange = {(event) => { 
          setRoom(event.target.value);
        }} />
      <button onClick={joinRoom}>Join a Room</button>
      {/* creates socket prop (property) */}
      <Chat socket={socket} username={username} room={room} /> 
    </div>
  );
}

export default App;