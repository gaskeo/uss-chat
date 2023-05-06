import React from 'react';
import './app.css';
import {addUser} from "./storage";

function App() {
  console.log(addUser({
    username: "gaskeo",
    password: "12345678",
    name: "Иван"
  }))
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
