import { Modal } from 'antd'
import { useState } from 'react'
import css from './Favorites.module.scss'
import { TodoTypes } from 'types/_types'
import { FavoritesItem } from './FavoritesItem/FavoritesItem'

type Props = {
   favorites: TodoTypes[]
   setFavorites: (arg: TodoTypes[]) => void
}

export const Favorites = ({ favorites, setFavorites }: Props) => {
   const [isModalOpen, setIsModalOpen] = useState(false)

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
               <FavoritesItem setFavorites={setFavorites} favorites={favorites} favorite={favorite} />
            ))}
         </Modal>
      </div>
   )
}
