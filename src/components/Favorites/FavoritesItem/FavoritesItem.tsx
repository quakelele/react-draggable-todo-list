import css from './FavoritesItem.module.scss'
import { TodoTypes } from 'types/_types'
import { AiTwotoneDelete } from 'react-icons/ai'

type Props = {
   setFavorites: (arg: TodoTypes[]) => void
   favorites: TodoTypes[]
   favorite: TodoTypes
}

export const FavoritesItem = ({ favorite, favorites, setFavorites }: Props) => {
   const deleteFromFavorites = () => {
      setFavorites([...favorites].filter(item => item.id !== favorite.id))
   }

   return (
      <div className={css.wrapper} style={{ backgroundColor: favorite.color }}>
         <h3>{favorite.title}</h3>
         <AiTwotoneDelete onClick={() => deleteFromFavorites()} />
      </div>
   )
}