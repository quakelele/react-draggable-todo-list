import { useState, useEffect } from 'react'

export const useLocalStorage = (initialValue: string, key: string) => {
   const storage = JSON.parse(localStorage.getItem(key) || initialValue)
   const [value, setValue] = useState(storage)

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value))
   }, [value])

   return [value, setValue]
}

// export const useLocalStorage = (initialValue: TodoTypes[], key: string) => {
//    const getLocal = () => {
//       const storage = localStorage.getItem(key)
//       if (storage) {
//          return JSON.parse(storage)
//       }
//       return initialValue
//    }

//    const [value, setValue] = useState(getLocal)

//    useEffect(() => {
//       localStorage.setItem(key, JSON.stringify(value))
//    }, [value])

//    return [value, setValue]
// }
