import { GoBookmarkSlash, GoBookmarkSlashFill } from 'react-icons/go'
import { CiEdit, CiSaveDown2 } from 'react-icons/ci'
import { AiTwotoneDelete } from 'react-icons/ai'
import { TodoTypes } from 'types/_types'
import { useState } from 'react'
import css from './Todo.module.scss'

type Props = {
   todo: TodoTypes
   todos: TodoTypes[]
   favorites: TodoTypes[]
   setTodos: (arg: TodoTypes[]) => void
   setFavorites: (arg: TodoTypes[]) => void
}

export const Todo = ({ todos, todo, setTodos, favorites, setFavorites }: Props) => {
   const [edit, setEdit] = useState<string | null>(null)
   const [editInputValue, setEditInputValue] = useState(todo.title)
   const isInFavorites = favorites.find(item => item.id === todo.id)

   const deleteFromFavorites = () => {
      setFavorites([...favorites].filter(item => item.id !== todo.id))
   }

   const addToFavorites = () => {
      if (!isInFavorites) {
         setFavorites([...favorites, todo])
         return
      }
      deleteFromFavorites()
   }

   const saveTodoHandler = (id: string) => {
      const updateTodos = [...todos].map(todo => {
         if (todo.id === id) {
            return { ...todo, title: editInputValue }
         }
         return todo
      })

      const updateTitleFavorites = favorites.map(favorite => {
         if (favorite.id === id) {
            return { ...favorite, title: editInputValue }
         }
         return favorite
      })
      setFavorites(updateTitleFavorites)
      setTodos(updateTodos)
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
               {isInFavorites ? (
                  <GoBookmarkSlashFill style={{ fill: 'white' }} onClick={addToFavorites} />
               ) : (
                  <GoBookmarkSlash onClick={addToFavorites} />
               )}
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
