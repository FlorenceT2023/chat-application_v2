import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat.js';

const socket = io.connect("http://localhost:3001"); // connects to server/back-end components

function App() {
  // sets state for username and chatroom
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true); //Allows chatbox to be visible if name and roomID is not null
    }
    else {
      alert("Please fill out Name and RoomID");
    }
  };

  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
        <h3>Join Chat🥳</h3>
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
          onKeyPress={(event) => {event.key === 'Enter' && joinRoom()
          }} 
          onChange = {(event) => { 
            setRoom(event.target.value);
          }} 
        />
        <button 
        onClick={joinRoom}>Join room</button>
      </div>
      ) : (
        // creates socket prop (property) 
        <Chat socket={socket} username={username} room={room} /> 
      )}
    </div>
    
  );
}

export default App;
