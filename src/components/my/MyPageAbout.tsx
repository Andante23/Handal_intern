
import IsNotFound from "../../common/IsNotFound";
import { UserProps } from "../../types/types";



const  MyPageAbout:React.FC<UserProps> = ({user}) => {

    return(
        <>
        <div>
                        <h4>나의 정보</h4>
                        <div>
                            <p>아이디: {user.id}</p>
                            <p>닉네임: {user.nickname}</p>
                            {user.avatar ?  <img src={user.avatar} alt="아바타" />: <IsNotFound/>}
                        </div>
                    </div>
        </>
    )
}

export default MyPageAbout;