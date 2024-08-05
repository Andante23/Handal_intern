import { useNavigate } from 'react-router-dom'

export default function useGotoPage() {
    const navigate = useNavigate()

    const gotoPageLogin = (): void => navigate('/login')

    const gotoPageRegist = (): void => navigate('/register')

    const gotoPageTodo = (): void => navigate('/todos')

    function goback(): void {
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
