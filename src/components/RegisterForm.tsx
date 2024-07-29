import useGotoPage from "../hooks/useGotoPage";
import useUserInfo from "../hooks/useUserInfo";



const RegisterForm:React.FC = () => {


    
    const {gotoPageLogin} = useGotoPage();

    const {id,nickname,password,onChangeUserId,onChangeUserNickName,onChangeUserPassword,registSubmitHandler} = useUserInfo();

return(
    <>
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

                <a onClick={gotoPageLogin}>로그인</a>
    </>
)

};

export default RegisterForm;