import { useNavigate } from 'react-router-dom'

export default function useGotoPage() {
    const navigate = useNavigate()

    const gotoPageLogin = () => navigate('/login')

    const gotoPageRegist = () => navigate('/register')

    const gotoPageTodo = () => navigate('/todos')

    function goback() {
        navigate(-1)
    }

    return {
        navigate,
        gotoPageLogin,
        gotoPageRegist,
        gotoPageTodo,
        goback,
    }
}
