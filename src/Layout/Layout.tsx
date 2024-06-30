import { InputField } from '../components/InputField/InputField'
import { useState, useEffect, useRef } from 'react'
import css from './Layout.module.scss'
import { Todo } from '@components/Todo/Todo'
import { TodoTypes } from 'types/_types'
import Draggable from 'react-draggable'

export const Layout = () => {
   const [todos, setTodos] = useState<TodoTypes[]>(JSON.parse(localStorage.getItem('todos') || '[]'))
   const nodeRef = useRef(null)

   useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
   }, [todos])

   const updatePos = (data: any, index: number) => {
      // фулл дичь из доки redraggable
      const newArray = [...todos]
      newArray[index].defaultPosition = { x: data.x, y: data.y }
      setTodos(newArray)
   }

   return (
      <div className={css.wrapper}>
         <InputField setTodos={setTodos} todos={todos} />
         {todos.map((todo, index) => (
            <Draggable
               onStop={(_, data) => updatePos(data, index)}
               defaultPosition={todo.defaultPosition}
               key={todo.id}>
               <div ref={nodeRef}>
                  <Todo setTodos={setTodos} todo={todo} todos={todos} />
               </div>
            </Draggable>
         ))}
      </div>
   )
}
