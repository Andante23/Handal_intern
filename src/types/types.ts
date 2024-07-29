 // 타입지정관련 파일들을 보관하는 파일입니다. 

 
 
 // 회원정보 인터페이스
 export interface User  {
    id: string;
    nickname: string;
    avatar: string | null; 
    success: boolean;
 }

// json 플레이스홀더에서 쓰이는 todo 정보 
 export type Todo = {
   userId: number;
   id: number;
   title: string;
   completed: boolean;
 };
