import LoadingBar from '../common/LoadingBar'
import useTodoQuery from '../hooks/useTodoQuery'
import { Todo } from '../types/types'

const MyTodo: React.FC = () => {
    const { data, isLoading, error } = useTodoQuery()

    if (isLoading) return <LoadingBar />
    if (error) return <div>에러메세지:{(error as Error).message}</div>

    return (
        <>
            <h1>할일 목록</h1>
            <ul>
                {data?.map((todo: Todo) => (
                    <li key={todo.id}>
                        <span>{todo.title}</span> - {todo.completed ? '완료됨' : '미완료'}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MyTodo
