import React, { useState } from "react"


const Login:React.FC = () => {
    // api 문서에서 제공해준  body 파람으로 state 변수 맞추기 
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



    

    return(
        <>
           
           <div>
               <h1>login</h1>
                <form onSubmit={loginHandler}>
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
                    <button type="submit">로그인</button>
                </form>
           </div>
        </>
    )
}

export default Login;