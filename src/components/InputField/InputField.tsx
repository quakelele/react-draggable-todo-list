import { v4 as uuidv4 } from 'uuid'
import { TodoTypes } from 'types/_types'
import { useState } from 'react'
import { GrClear } from 'react-icons/gr'
import css from './InputField.module.scss'
import randomColor from 'randomcolor'
type Props = {
   todos: TodoTypes[]
   setTodos: (arg: TodoTypes[]) => void
}

export const InputField = ({ setTodos, todos }: Props) => {
   const [value, setValue] = useState('')

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
   }
   const randomValues = (min: number, max: number) => {
      return Math.random() * (max - min) + min
   }

   const addTodo = () => {
      const todoObject = {
         title: value,
         id: uuidv4(),
         completed: false,
         color: randomColor({ luminosity: 'bright', format: 'rgba', alpha: 0.5 }),
         defaultPosition: { x: randomValues(-300, 300), y: randomValues(-300, 300) },
      }

      if (value.trim() ) {
         if (todos.length <= 9) {
            setTodos([...todos, todoObject])
            return
         }
         setTodos([...todos.splice(1), todoObject])
      }
      setValue('')
   }

   const keyPressEnter = (e: any) => {
      if (e.which === 13) {
         addTodo()
      }
      setValue('')

   }

   return (
      <div className={css.wrapper}>
         <input
            type="text"
            placeholder="type something..."
            value={value}
            onKeyDown={e => keyPressEnter(e)}
            onChange={onChange}
         />
         <GrClear onClick={() => setTodos([])} />
         <button onClick={addTodo}>add</button>
      </div>
   )
}
