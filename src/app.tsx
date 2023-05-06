import React, {useState} from 'react';
import './app.css';
import {getAuthUser, getCurrentRoom} from "./storage";
import Login from "./pages/login";
import Room from "./pages/room";

function App() {
  const [currentUser, updateCurrentUser] = useState(getAuthUser());
  const [currentRoom, updateCurrentRoom] = useState(getCurrentRoom());
  if (!currentUser) return <Login updateCurrentUser={updateCurrentUser} updateCurrentRoom={updateCurrentRoom}/>;

  return (
    <Room roomId={currentRoom}/>
  );
}

export default App;
