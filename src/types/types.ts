// 타입지정관련 파일들을 보관하는 파일입니다.

// 회원정보 타입
export interface User {
    id: string
    nickname: string
    avatar: string | null
    success: boolean
}

// json 플레이스홀더에서 쓰이는 todo 타입
export type Todo = {
    userId: number
    id: number
    title: string
    completed: boolean
}

// 유저정보를 프롭스 드릴링으로 건네준 데이터 정보들의 타입
export interface UserProps {
    user: User
}



export interface ErrorInfoProps {
    error:string|null;
}

