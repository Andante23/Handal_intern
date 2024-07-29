import React from "react";
import useGotoPage from "../../hooks/useGotoPage";
import useUserInfo from "../../hooks/useUserInfo";




const LoginForm:React.FC = () => {

    const {id,nickname,password,loginHandler,onChangeUserId,onChangeUserNickName,onChangeUserPassword} = useUserInfo();
    const {gotoPageRegist} = useGotoPage();    

return(
    <>
    <form onSubmit={loginHandler}>
                    <label>
                         아이디:
                        <input type="text" value={id}  onChange={onChangeUserId } required placeholder="아이디를 입력해주세요"/>

                    </label> 
                    <br ></br>

                    <label>
                         비밀번호:
                        <input type="text" value={password}  onChange={onChangeUserPassword } required placeholder="비밀번호를 입력해주세요"/>
                        
                    </label>      
                    <br ></br>
                    <label>
                         닉네임: 
                        <input type="text" value={nickname}  onChange={onChangeUserNickName} required placeholder="닉네임을 입력해주세요 "/>
                    </label> 
                    <br></br>
                    <button type="submit">로그인</button>
                </form>
                
                <p>
                계정이 이미 있다면  <b><span onClick={gotoPageRegist}>회원가입</span></b>
                </p>
            
    </>
)

}

export default LoginForm;