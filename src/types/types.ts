


export interface User {
    id: string
    nickname: string
    avatar: string | null
    success: boolean
}


export type Todo = {
    userId: number
    id: number
    title: string
    completed: boolean
}


export interface UserProps {
    user: User
}



export interface ErrorInfoProps {
    error:string|null;
}



export interface HeaderProps  {

    headerContent :string
    
    }
    

export interface MyTodoProps{
    todo:Todo;
}
