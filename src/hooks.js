import { useState, useEffect } from 'react'


export function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue)

    useEffect(
        () => {
            setValue(initialValue)
        },
        [initialValue]
    )

    function onChange({ target }) {
        setValue(target.value)
    }

    return [
        value,
        setValue,
        {
            value,
            onChange
        }
    ]
}
