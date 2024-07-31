import styled from "styled-components"
import { MyTodoProps } from "../../types/types"
const MyTodoList:React.FC<MyTodoProps> = ({todo}) =>{

    return(
        <>
         <StTodoItem key={todo.id}>
                        <StTodoTitle>{todo.title}</StTodoTitle>
                        <StTodoStatus completed={todo.completed}>{todo.completed ? '완료됨' : '미완료'}</StTodoStatus>
                    </StTodoItem>
        </>
    )
}



const StTodoItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    background-color: #f9f9f9;

    &:last-child {
        border-bottom: none;
    }
`

const StTodoTitle = styled.span`
    font-size: 18px;
    color: #333;
`

const StTodoStatus = styled.span<{ completed: boolean }>`
    font-size: 16px;
    color: ${(props) => (props.completed ? '#28a745' : '#dc3545')};
`

const StErrorMessage = styled.div`
    color: #dc3545;
    text-align: center;
    font-size: 18px;
    margin: 20px;
`

export default MyTodoList;
