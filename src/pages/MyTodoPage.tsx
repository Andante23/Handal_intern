import React from 'react'
import LoadingBar from '../common/LoadingBar'
import useTodoQuery from '../hooks/useTodoQuery'
import { Todo } from '../types/types'
import styled from 'styled-components'
import MyTodoList from '../components/myTodo/MyTodoList'
import Header from '../common/Header'
import ErrorComponent from '../common/ErrorComponent'

const MyTodoPage: React.FC = () => {
    const { data, isLoading, error } = useTodoQuery()

    if (isLoading) return <LoadingBar />
    if (error) return <ErrorComponent error={error.message} />

    return (
        <StContainer>
            <Header headerContent="할일목록" />
            <StTodoList>{data?.map((todo: Todo) => <MyTodoList todo={todo} />)}</StTodoList>
        </StContainer>
    )
}

const StContainer = styled.div``

const StTodoList = styled.ul``

export default MyTodoPage
