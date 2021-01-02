export interface userInterface {
    id: string,
    number: string,
}

export interface messageInterface {
    text: string
}

export interface userInterface {
    id: string,
    name: string
}
export interface IUsers {
    data: Array<userInterface>
}

export interface IMessages extends Array<messageInterface> {}

export type usersType = userInterface[]

