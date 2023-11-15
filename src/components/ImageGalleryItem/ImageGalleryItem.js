import {Item, Image} from './ImageGalleryItem.styled';

import {ImgModal} from '../Modal/Modal';
import { useState } from 'react';

export const ImagesGalleryItem =({ image })=>  {

  const [isModalOpen, setIsModalOpen]= useState(false);
 
      const openModal = () => {
        setIsModalOpen(true)
      };
    
      const closeModal = () => {
        setIsModalOpen(false)
      };
    
    return (
        <div>
    <Item>
         <Image src={image.webformatURL} alt={image.tags} onClick={openModal} />
    </Item>
<ImgModal img={image.largeImageURL} alt = {image.tags} onClose={closeModal} onOpen = {isModalOpen}/>
        </div>
  
)

}
