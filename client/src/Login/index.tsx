import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import axios from 'axios'
import Chat from '../Chat';

const ENDPOINT = 'http://localhost:4001'

const Login = () => {
    const [userName, setUserName] = useState<any>('')
    const [room, setRoom] = useState<string>('chat')
    const getUserName = () => {
        axios.get(`${ENDPOINT}/public/login`)
            .then((data) => {
                if (data && data.data && data.data.userName)
                    setUserName(data.data.userName)
            })
    }

    return (
        <Router>
            {!userName ?
                <Link to='/chat'>
                    <button onClick={() => getUserName()}> Login</button>
                </Link> : <></>}

            <Switch>
                <Route path='/chat'>
                    <Chat
                        userName={userName}
                    />
                </Route>
            </Switch>
        </Router>
    )
}

export default Login;
