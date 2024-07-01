import css from './Todo.module.scss'
import { TodoTypes } from 'types/_types'
import { AiTwotoneDelete } from 'react-icons/ai'
import { CiEdit, CiSaveDown2 } from 'react-icons/ci'
import { useState } from 'react'

type Props = {
   todo: TodoTypes
   todos: TodoTypes[]
   setTodos: (arg: TodoTypes[]) => void
}

export const Todo = ({ todos, todo, setTodos }: Props) => {
   const [edit, setEdit] = useState<string | null>(null)
   const [editInputValue, setEditInputValue] = useState(todo.title)
   const saveTodoHandler = (id: string) => {
      setTodos(
         [...todos].map(item => {
            if (item.id === id) {
               return { ...item, title: editInputValue }
            }
            return item
         })
      )
      setEdit(null)
   }

   const deleteTodo = (id: string) => {
      setTodos([...todos].filter(item => item.id !== id))
   }

   const checkboxToggler = (id: string) => {
      setTodos(
         [...todos].map(item => {
            if (item.id === id) {
               return { ...item, completed: !todo.completed }
            }
            return item
         })
      )
   }
   return (
      <div className={css.wrapper} style={{ backgroundColor: todo.color }}>
         <div className={css.todo}>
            {edit === todo.id ? (
               <div className={`${css.editInputBlock} ${css.nonDraggable}`}>
                  <input
                     className={todo.completed ? `${css.active} ${css.nonDraggable}` : ''}
                     onChange={e => setEditInputValue(e.target.value)}
                     value={editInputValue}
                     type="text"
                  />{' '}
                  <CiSaveDown2 className={css.nonDraggable} onClick={() => saveTodoHandler(todo.id)} />
               </div>
            ) : (
               <h3 className={todo.completed ? css.active : ''}>{todo.title}</h3>
            )}
            <div className={`${css.right} ${css.nonDraggable}`}>
               <AiTwotoneDelete className={css.nonDraggable} onClick={() => deleteTodo(todo.id)} />
               <CiEdit className={css.nonDraggable} onClick={() => setEdit(todo.id)} />

               <input
                  className={`${css.checkbox} ${css.nonDraggable}`}
                  checked={todo.completed}
                  onChange={() => checkboxToggler(todo.id)}
                  type="checkbox"
               />
            </div>
         </div>
      </div>
   )
}
