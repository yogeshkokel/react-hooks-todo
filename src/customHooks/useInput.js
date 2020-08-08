import { useState } from 'react';

function useInput(initalValue) {
    const [value, setValue] = useState(initalValue);

    const resetValue = () => {
        setValue('')
    }

    const bindValue = {
        value,
        onChange: e => {
            setValue(e.target.value);
        }
    }

    return [value, resetValue, bindValue];
}

export default useInput;