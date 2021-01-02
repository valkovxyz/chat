import React, {useEffect, useState} from 'react';
import Login from "./Login";
import Chat from './Chat'

const App = () => {
  return (
    <div className="App">
        <Login/>
        <Chat/>
    </div>
  );
}

export default App;
