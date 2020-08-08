import { useEffect } from 'react';

function useDocTitle(title) {
    useEffect(() => {
        document.title = title;
    })
}

export default useDocTitle;