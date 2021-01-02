import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client'
import { IMessages } from './interface';

const ENDPOINT = 'http://localhost:4001'
let socket: any;

const Chat: any = ({userName}: any) => {
    const [users, setUsers] = useState<any>();
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<any>([])
    useEffect(() => {
        if (userName) {
            socket = io(ENDPOINT)

            socket.emit('join', {userName})

            socket.on('new_join', (message: string) => {
                setMessages((msgs: IMessages) => [...msgs, message]);
            })

            socket.on('new_leave', (message: string) => {
                setMessages((msgs: IMessages) => [...msgs, message]);
            })

            socket.on('new_message', (message: string) => {

                setMessages((msgs: IMessages) => [...msgs, message]);
            })

            socket.on('room_users', ({users}: any) => {
                setUsers(users);
            });
        }

    }, [userName])

    const sendMessage = () => {
        if (message) {
            socket.emit('message', message)
            setMessage('')
        }
    }

    return (
        <div className="container">
            {userName ?
                <div className="chat">
                    <div className="chat-messages">
                        {messages ? messages.map((message: any) => (
                            <div key={Math.random()}>
                                {message.text}
                            </div>
                        )) : ''}
                    </div>
                    <div className="chat-input">
                        <input className="chat-input__area"
                               value={message}
                               onChange={(e) => setMessage(e.target.value)}/>
                        <button
                            className="chat-input__button"
                            onClick={(e) => sendMessage()}
                        >Send
                        </button>
                    </div>
                    <div className="users">Users: <br/>
                        {users ? users.map((user: any) => (
                            <div key={user.id}>
                                {user.name}
                            </div>
                        )) : ''}</div>
                </div> : <></>
            }
        </div>
    )
}

export default Chat;
