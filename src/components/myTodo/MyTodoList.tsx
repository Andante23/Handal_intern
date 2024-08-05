import styled from 'styled-components'
import { MyTodoProps } from '../../types/types'
const MyTodoList: React.FC<MyTodoProps> = ({ todo }) => {
    return (
        <>
            <StTodoItem key={todo.id}>
                <StTodoTitle>{todo.title}</StTodoTitle>
                {/* <StTodoStatus completed={todo.completed}>{todo.completed ? '완료됨' : '미완료'}</StTodoStatus> */}
            </StTodoItem>
        </>
    )
}

const StTodoItem = styled.li``

const StTodoTitle = styled.span``

// const StTodoStatus = styled.span``

export default MyTodoList
