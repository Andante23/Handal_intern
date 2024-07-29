/*
  페이지 이동하는 함수를 모아놓은 커스텀혹
 */
import { useNavigate } from "react-router-dom";


export default function useGotoPage(){



const navigate = useNavigate();


// 17: 로그인 페이지로 이동하는 함수
const gotoPageLogin = () => navigate('/login');


// 19: 회원가입 페이지로 이동하는 함수
const gotoPageRegist = () => navigate('/register');

// 24: 할일목록 페이지로 이동하는 함수
const gotoPageTodo = () =>    navigate('/todos');


return {
    navigate,
   gotoPageLogin,
   gotoPageRegist,
   gotoPageTodo
}

}










