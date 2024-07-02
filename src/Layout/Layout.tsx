import { InputField } from '../components/InputField/InputField'
import { useState, useEffect } from 'react'
import css from './Layout.module.scss'
import { Todo } from '@components/Todo/Todo'
import { TodoTypes } from 'types/_types'
import Draggable from 'react-draggable'
import { Favorites } from '@components/Favorites/Favorites'

export const Layout = () => {
   const [todos, setTodos] = useState<TodoTypes[]>(JSON.parse(localStorage.getItem('todos') || '[]'))
   const [favorites, setFavorites] = useState<TodoTypes[]>(JSON.parse(localStorage.getItem('favorites') || '[]'))

   useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
      localStorage.setItem('favorites', JSON.stringify(favorites))
   }, [todos,favorites])



   const updatePos = (data: any, index: number) => {
      //  дичь из доки redraggable
      const newArray = [...todos]
      newArray[index].defaultPosition = { x: data.x, y: data.y }
      setTodos(newArray)
   }

   return (
      <div className={css.wrapper}>
            <InputField setTodos={setTodos} todos={todos} />
            <Favorites favorites={favorites} setFavorites={setFavorites}/>
    

         {todos.map((todo, index) => (
            <Draggable
               cancel={`.${css.nonDraggable}`}
               onStop={(_, data) => updatePos(data, index)}
               defaultPosition={todo.defaultPosition}
               key={todo.id}>
               <div className={css.favorites}>
                  <Todo favorites={favorites} setFavorites={setFavorites} setTodos={setTodos} todo={todo} todos={todos} />
               </div>
            </Draggable>
         ))}
      </div>
   )
}
