import React, { useState } from "react"


const Register:React.FC = () => {
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


         console.log(response);
         

         //  응답 데이터
         const data = await response.json();

          console.log(data)
          alert(data.message);


        };
    

    return(
        <>
           <div>
               <h1>회원가입</h1>
                <form onSubmit={registSubmitHandler }>
                    <label>
                         아이디:
                        <input type="text" value={id}  onChange={onChangeUserId } required/>

                    </label>
                    <label>
                         비밀번호:
                        <input type="text" value={password}  onChange={onChangeUserPassword } required/>
                        
                    </label>
                    <label>
                         닉네임: 
                        <input type="text" value={nickname}  onChange={onChangeUserNickName} required/>
                    </label>
                    <button type="submit">회원가입</button>
                </form>
           </div>
        </>
    )
}

export default Register;