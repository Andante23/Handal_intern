
// 회원가입, 로그인 페이지에서 쓰이는 변수 , 함수 관리하는 커스텀 혹
// 커스텀혹은  시작을 use로 시작한다.

import { useState } from "react";





export default function useUserInfo(){



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

    const onReset = () =>{
        setId("");
        setPassword("");
        setNickName("");
    }


    

       
    const registSubmitHandler = async (event:React.FormEvent) =>{
        
      
        event.preventDefault();

       
         const response = await fetch( `${import.meta.env.VITE_JWT_SERVER_URL }/register` , {
            method:'post',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id,password ,nickname}),
         });



         if(id.trim() === "" && password.trim() === "" && nickname.trim()===""){
            alert("모든 칸을 채워주세요")
            onReset();
            return;
        }

        
         

      
         const data = await response.json();
          alert(data.message);


        };
    
         

    return{
        id , password , nickname ,
     
        onReset,
        registSubmitHandler,
        onChangeUserId,
        onChangeUserPassword,
        onChangeUserNickName
    }
}