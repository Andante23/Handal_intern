import useGotoPage from '../hooks/useGotoPage'
import { ErrorInfoProps } from '../types/types'

const ErrorComponent: React.FC<ErrorInfoProps> = ({ error }) => {
    //=> 에러가 나올시  이 페이지가 보임

    const { goback } = useGotoPage()

    return (
        <>
            <div>
                <p>
                    에러 내용 : <b>{error}</b>
                </p>
                <br></br>
                <button onClick={goback}>이전페이지</button>
            </div>
        </>
    )
}

export default ErrorComponent
