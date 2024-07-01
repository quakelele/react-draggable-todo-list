import { Modal } from 'antd'
import { useState } from 'react'
import css from './Favorites.module.scss'

export const Favorites = () => {
   const [isModalOpen, setIsModalOpen] = useState(false)

   return (
      <div className={css.wrapper}>
         <button onClick={() => setIsModalOpen(true)}>Favorites</button>
         <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
         </Modal>
      </div>
   )
}
