import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom'

import Login from '../pages/LoginPage'
import MyPage from '../pages/MyPage'
import Register from '../pages/RegisterPage'
import useAuthStore from '../store/useAuthStore'
import MyTodoPage from '../pages/MyTodoPage'

// 회원가입 , 로그인 , 마이페이지  라우팅 파일
const Routers: React.FC = () => {
    // 인증토큰
    const { token } = useAuthStore((state) => state)

    return (
        <>
            <Router>
                <Routes>
                    {/* 모든 사용자는 로그인 페이지로 리디렉션 */}
                    <Route path="/" element={<Navigate to="/login" />} />

                    {/* 로그인 페이지 */}
                    <Route path="/login" element={token ? <Navigate to="/mypage" /> : <Login />} />

                    {/* 회원가입 페이지 */}
                    <Route path="/register" element={<Register />} />

                    {/* 인증이 필요한 페이지 */}
                    <Route path="/mypage" element={token ? <MyPage /> : <Navigate to="/login" />} />
                    <Route path="/todos" element={token ? <MyTodoPage /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </>
    )
}

export default Routers
