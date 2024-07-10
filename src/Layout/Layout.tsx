import { useLocalStorage } from '../hooks/useLocalStorage'
import { InputField } from '../components/InputField/InputField'
import { Favorites } from '@components/Favorites/Favorites'
import { TodoTypes } from 'types/_types'
import { Todo } from '@components/Todo/Todo'
import Draggable from 'react-draggable'
import css from './Layout.module.scss'
export const Layout = () => {
   const [todos, setTodos] = useLocalStorage('[]', 'todos')
   const [favorites, setFavorites] = useLocalStorage('[]', 'favorites')

   const updatePos = (data: any, index: number) => {
      //  дичь из доки redraggable
      const newArray = [...todos]
      newArray[index].defaultPosition = { x: data.x, y: data.y }
      setTodos(newArray)
   }
   return (
      <div className={css.wrapper}>
         <div className={css.top}>
            <InputField setTodos={setTodos} todos={todos} />
            <Favorites favorites={favorites} setFavorites={setFavorites} />
         </div>
         {todos.map((todo: TodoTypes, index: number) => (
            <Draggable
               cancel={`.${css.nonDraggable}`}
               onStop={(_, data) => updatePos(data, index)}
               defaultPosition={todo.defaultPosition}
               key={todo.id}>
               <div className={css.todo}>
                  <Todo
                     favorites={favorites}
                     setFavorites={setFavorites}
                     setTodos={setTodos}
                     todo={todo}
                     todos={todos}
                  />
               </div>
            </Draggable>
         ))}
      </div>
   )
}
