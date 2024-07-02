import { FavoritesItem } from './FavoritesItem/FavoritesItem'
import { TodoTypes } from 'types/_types'
import { useState } from 'react'
import { Modal } from 'antd'
import randomColor from 'randomcolor'
import css from './Favorites.module.scss'

type Props = {
   favorites: TodoTypes[]
   setFavorites: (arg: TodoTypes[]) => void
}

export const Favorites = ({ favorites, setFavorites }: Props) => {
   const [isModalOpen, setIsModalOpen] = useState(false)

   const setRandomColor = () => {
      const color = randomColor({ luminosity: 'dark', format: 'rgba', alpha: 0.5 })
      document.documentElement.style.setProperty('--random-bg-color', color)
   }

   setRandomColor()

   return (
      <div className={css.wrapper}>
         <button onClick={() => setIsModalOpen(true)}>Favorites</button>

         <Modal
            className={css.modal}
            width={250}
            closeIcon={false}
            footer={null}
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}>
            {favorites.map(favorite => (
               <FavoritesItem key={favorite.id} setFavorites={setFavorites} favorites={favorites} favorite={favorite} />
            ))}
         </Modal>
      </div>
   )
}
