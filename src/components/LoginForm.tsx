import React from "react";
import useGotoPage from "../hooks/useGotoPage";
import useUserInfo from "../hooks/useUserInfo";


const LoginForm:React.FC = () => {

    const {id,nickname,password,loginHandler,onChangeUserId,onChangeUserNickName,onChangeUserPassword} = useUserInfo();
    const {gotoPageRegist} = useGotoPage();    

return(
    <>
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
                <a onClick={gotoPageRegist}>회원가입</a>
    </>
)

}

export default LoginForm;