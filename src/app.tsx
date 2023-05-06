import React, {useState} from 'react';
import './app.css';
import {getAuthUser} from "./storage";
import Login from "./pages/login";

function App() {
  const [currentUser, updateCurrentUser] = useState(getAuthUser());
  const [currentRoom, updateCurrentRoom] = useState(null);
  if (!currentUser) return <Login updateCurrentUser={updateCurrentUser}/>;
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
