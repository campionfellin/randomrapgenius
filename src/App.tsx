import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import fetch from 'node-fetch';

const App = () => {

  useEffect(() => {

    const req = async () => {
      const response = await fetch('https://api.genius.com/annotations/10225840&access_token=tgwOHu-njUlWatAIyRQRSEB0hKBweUpTHF9Cwz_MgA119iBHL73v7wXIpALVRanp');
    
      const body = await response.text();
      console.log(body);
    }

    req()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
