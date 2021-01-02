import { userInterface } from "./interface";

const users: any = [];

export const addUser = (id: string, name: string) => {
    const user: userInterface =  {id, name}
    users.push(user)
    return { user }
}

export const removeUser = (id: string) => {
    const index = users.findIndex((user: userInterface) => user.id === id);
    if(index !== -1) return users.splice(index, 1)[0];
}

export const getUser = (id: string) => users.find((user: userInterface) => {
    user.id === id;
    return user
});

export const getUsersInRoom = (room: string) => users.filter((user: userInterface) => user.room === room);

