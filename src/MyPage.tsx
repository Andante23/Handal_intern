import { useEffect, useState } from "react";

 // 회원정보 인터페이스
 interface User  {
    id: string;
    nickname: string;
    avatar: string | null; 
    success: boolean;
 }

const MyPage:React.FC = ( ) => {

    // 로그아웃 함수
    const logOutHandler = ()=>{
        localStorage.removeItem('token');
        window.location.href='/login';
    }

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchUserData = async () =>{

            /*
               로그인시에 로컬스토리지에 저장된 토큰을 가져옵니다.
                31: 토큰이 없는 경우 처리
            */
            const token = localStorage.getItem("token");
            if(!token){
                setError('토큰이 발견 안되었어요');
                setLoading(false);
                return;
            }

              
            try{
                // 사용자 데이터 응답
                // 49: 응답이 아니라면 실행되는 코드
                const response = await fetch(`${import.meta.env.VITE_JWT_SERVER_URL }/user`,{
                   method: 'GET',
                   headers:{
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                   }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }


                // 사용자 데이터
                const data: User = await response.json();

                if(data.success){
                    setUser(data);
                }else{
                    setError('사용자 프로필을 가져오는데 실패하였습니다.')
                }
            }catch(error){
                console.error('프로필 가져오는데 실패 =>',error);
                setError('당신의 프로필 가져오는데 실패')
                
            }finally{
                setLoading(false);
            }

        }

        fetchUserData();
    
    
    },[]);


    // 불러오는중을 표시합니다.
    if(loading) return <p>로딩....</p>;
    if(error) return <p>{error}</p>;

    


    return(
        <>
         <div>
              <header>
                   <h1>나의 페이지</h1>
                    
                    <div>
                        {user?(
                            <div>
                                <h4>나의 정보</h4>
                                <div>
                                    <p>아이디: {user.id}</p>
                                    <p>닉네임: {user.nickname}</p>
                                    {user.avatar ? (
                                        <img src="#" alt="아바타" />
                                    ):(
                                        <p>no avatar</p>
                                    )}
                                </div>
                            </div>
                        ):(
                            <p>사용자 데이터 없음?</p>
                        )}
                    </div>
                   <button onClick={logOutHandler}>로그아웃</button>
              </header>
         </div>
        </>
    )
}

export default MyPage;