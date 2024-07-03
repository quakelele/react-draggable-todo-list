import { useState } from 'react'

export const useToggler = (initialValue: boolean) => {
   const [value, setValue] = useState(initialValue)
   const toggle = () => {
      setValue(!initialValue)
   }
   return [value, toggle]
}
