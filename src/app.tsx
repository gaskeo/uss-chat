import React, {useState} from 'react';

import {Route, Routes, HashRouter as Router, Navigate} from "react-router-dom";
import {getAuthUser, getCurrentRoom} from "./storage";
import Login from "./pages/login";
import Room from "./pages/room";
import Register from "./pages/register";
import {AuthLayout} from "./components/layouts";

function App() {
    const [currentUser, updateCurrentUser] = useState(getAuthUser());
    const [currentRoom, updateCurrentRoom] = useState(getCurrentRoom());

    return (
        <Router>
            <Routes>
                <Route path="room" element={<AuthLayout><Room roomId={currentRoom}/></AuthLayout>}/>
                <Route path="login" element={<Login  updateCurrentUser={updateCurrentUser} updateCurrentRoom={updateCurrentRoom}/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="*" element={<Navigate to="register"/>}/>
            </Routes>
        </Router>
    );
}

export default App;
