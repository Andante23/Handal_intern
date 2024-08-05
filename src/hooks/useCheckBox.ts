import { ChangeEvent, useState } from 'react'

export default function useCheckBox() {
    const [checked, setChecked] = useState<boolean>(false) //=> 기본 상태는 false , 안보이는 상태
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => setChecked(event.target.checked)

    return { checked, handleCheckboxChange }
}
