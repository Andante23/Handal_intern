import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom'
import Login from '../pages/LoginPage'
import MyPage from '../pages/MyPage'
import Register from '../pages/RegisterPage'
import MyTodoPage from '../pages/MyTodoPage'
import useProfileUpdate from '../hooks/useProfileUpdate'


const Routers: React.FC = () => {
      const {token} = useProfileUpdate();
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={token ? <Navigate to="/mypage" /> : <Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/mypage" element={token ? <MyPage /> : <Navigate to="/login" />} />
                    <Route path="/todos" element={token ? <MyTodoPage /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </>
    )
}

export default Routers
