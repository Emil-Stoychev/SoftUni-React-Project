import { useState } from "react"

const useSearch = (defaultValue) => {
    const [value, setValue] = useState(defaultValue)

    return [value, setValue]
}

export default useSearch