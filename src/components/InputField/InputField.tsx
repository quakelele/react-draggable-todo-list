import { TodoTypes } from 'types/_types'
import { useState } from 'react'
import css from './InputField.module.scss'
import { v4 as uuidv4 } from 'uuid'
import randomColor from 'randomcolor'

type Props = {
   todos: TodoTypes[]
   setTodos: (arg: TodoTypes[]) => void
}


export const InputField = ({ setTodos, todos }: Props) => {
   const [value, setValue] = useState('')

   const randomValues = (min: number, max: number) => {
      return Math.random() * (max - min) + min
   }

   const addTodo = () => {
      const todoObject = {
         title: value,
         id: uuidv4(),
         completed: false,
         color: randomColor({ luminosity: 'light', format: 'hsla'}),
         defaultPosition: { x: randomValues(-300, 300), y: randomValues(-300, 300) },
      }
      if (value.trim() !== '') {
         setTodos([...todos, todoObject])
      }
      setValue('')
   }

   const keyPressEnter = (e:any) => {
      if (e.which === 13) {
         addTodo()
      }
   }
   return (
      <div className={css.wrapper}>
         <input
            type="text"
            placeholder="enter something"
            value={value}
            onKeyDown={e => keyPressEnter(e)}
            onChange={e => setValue(e.target.value)}
         />
         <button onClick={addTodo}>add</button>
      </div>
   )
}