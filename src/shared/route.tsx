import { BrowserRouter as Router, Route, Navigate , Routes  } from 'react-router-dom';

import Login from '../page/Login';
import MyPage from '../page/MyPage';
import MyTodo from '../page/MyTodo';
import Register from '../page/Register';


// 회원가입 , 로그인 , 마이페이지  라우팅 파일
export default function ProjectRoute(){


    // 인증토큰 
    const isAuthenticated = !!localStorage.getItem('token');

return(
    <>
      <Router>
          <Routes>
               {/* 모든 사용자는 로그인 페이지 라우트로 이동    */}
               <Route path="/" element={<Navigate to={"/login"}/>} />

               {/* 로그인  라우트 */}
               <Route path="/login" element={isAuthenticated ? <Navigate to="/mypage" /> : <Login />} />
               
               {/*  회원가입  라우트 */}
                <Route path="/register" element={<Register />} />
               
                 {/* 인증이 필요한 라우트 */}
                <Route path="/mypage" element={isAuthenticated ? <MyPage /> : <Navigate to="/login" />} />

                <Route path='/todos' element={isAuthenticated ? <MyTodo/> : <Navigate to="/login"/> } />
          </Routes>
      </Router>

  </>
)
}


