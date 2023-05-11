import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import {initIndexedDB} from "./storage";
import {init} from "./example/init";

initIndexedDB();
init();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
