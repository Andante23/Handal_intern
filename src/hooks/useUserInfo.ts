
// 회원가입, 로그인 페이지에서 쓰이는 변수 , 함수 관리하는 커스텀 혹
// 커스텀혹은  시작을 use로 시작한다.

import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function useUserInfo(){

    const navigate = useNavigate();

    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nickname, setNickName] = useState<string>('');


    const onChangeUserId = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setId(event.target.value);
    }
    const onChangeUserPassword = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value);
    }
    const onChangeUserNickName = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setNickName(event.target.value);
    }


    const loginHandler = async (event:React.FormEvent) =>{
        
        // 기본동작 방지
        event.preventDefault();

        // try catch 문으로   로그인 성공 실패 여부 가리기
        try{
        // 사용자가  로그인 창에 입력시에 받는 응답
         const response = await fetch( `${import.meta.env.VITE_JWT_SERVER_URL }/login` , {
            method:'post',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id,password,nickname}),
         });


         //  응답 데이터
         const data = await response.json();

       
          
          if(data.accessToken){
          
            localStorage.setItem("token",data.accessToken); //=>  엑세스토큰 로컬스토리지에 저장
            window.location.href = '/mypage';  //=> 나의 페이지로 이동
          }else{
            alert(data.message || 'An unknown error occurred');
          }

        }catch(error){
            console.error('login failed',error);
            alert("로그인 실패하였습니다.")
        }

    };

       
    const registSubmitHandler = async (event:React.FormEvent) =>{
        
        // 기본동작 방지
        event.preventDefault();

        // 사용자가  로그인 창에 입력시에 받는 응답
         const response = await fetch( `${import.meta.env.VITE_JWT_SERVER_URL }/register` , {
            method:'post',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id,password ,nickname}),
         });


        
         

         //  응답 데이터
         const data = await response.json();
          alert(data.message);


        };
    
         const logOutHandler = () => {
            localStorage.removeItem('token');
            navigate('/login');    
        };

    return{
        id , password , nickname ,
         logOutHandler,
        loginHandler,
        registSubmitHandler,
        onChangeUserId,
        onChangeUserPassword,
        onChangeUserNickName
    }
}