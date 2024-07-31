import React from 'react'
import LoadingBar from '../common/LoadingBar'
import useTodoQuery from '../hooks/useTodoQuery'
import { Todo } from '../types/types'
import styled from 'styled-components'
import ErrorInfoPage from '../common/ErrorInfoPage'
import MyTodoList from '../components/myTodo/MyTodoList'
import Header from '../common/Header'

const MyTodoPage: React.FC = () => {
    const { data, isLoading, error } = useTodoQuery()

    if (isLoading) return <LoadingBar />
    if (error) return <ErrorInfoPage  error={error.message}/>

    return (
        <StContainer>
            <Header headerContent='할일목록'/>
            <StTodoList>
                {data?.map((todo: Todo) => (
                   <MyTodoList todo={todo} />
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



const StTodoList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`



export default MyTodoPage;
