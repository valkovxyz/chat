import express from 'express';
import socket from 'socket.io';
import {createServer} from 'http';
import {uniqueNamesGenerator, Config, names} from 'unique-names-generator';
import cors from 'cors';

import {addUser, removeUser, getUser, getUsersInRoom} from './users'

const config: Config = {
    dictionaries: [names]
}

const characterName: string = uniqueNamesGenerator(config);

const PORT = process.env.PORT || 4001;
const app = express();
const http = createServer(app)
// @ts-ignore
const io = socket(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.use(cors())

app.get('/public/login', (req, res) => {
    res.send({userName: characterName})
})


io.on('connection', (socket: any) => {
    socket.emit('connection', null)
    socket.on('join', (user: any) => {
        addUser(socket.id, user.userName)
        socket.join('main_room');
        socket.broadcast.to('main_room').emit('new_join', {text: `${user.userName} has joined!`})
        io.to('main_room').emit('room_users', {users: getUsersInRoom(user.room)})
    })

    socket.on('message', (message: string) => {
        const user = getUser(socket.id)
        if (user) {
            io.to('main_room').emit('new_message', {text: `${user.name}: ${message}`})
        }
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to('main_room').emit('new_leave', {text: `${user.name} has left.`});
            io.to('main_room').emit('room_users', {users: getUsersInRoom(user.room)});
        }
    })
})

http.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

