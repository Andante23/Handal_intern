import React from 'react'
import LoadingBar from '../common/LoadingBar'
import useTodoQuery from '../hooks/useTodoQuery'
import { Todo } from '../types/types'
import styled from 'styled-components'

const MyTodo: React.FC = () => {
    const { data, isLoading, error } = useTodoQuery()

    if (isLoading) return <LoadingBar />
    if (error) return <StErrorMessage>에러메세지: {(error as Error).message}</StErrorMessage>

    return (
        <StContainer>
            <StHeader>할일 목록</StHeader>
            <StTodoList>
                {data?.map((todo: Todo) => (
                    <StTodoItem key={todo.id}>
                        <StTodoTitle>{todo.title}</StTodoTitle>
                        <StTodoStatus completed={todo.completed}>{todo.completed ? '완료됨' : '미완료'}</StTodoStatus>
                    </StTodoItem>
                ))}
            </StTodoList>
        </StContainer>
    )
}

const StContainer = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const StHeader = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
`

const StTodoList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`

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

export default MyTodo
