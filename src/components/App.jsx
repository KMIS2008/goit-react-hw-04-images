
// import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import {fetchImages} from './api';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGalery} from './ImageGallery/ImageGallery';
import {ButtonLoadMore} from './Button/Button';
import {Loader} from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

export const App = ()=> {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading]= useState(false);
  const [error, setError] = useState(false);
  const [nameImage, setNameImage] = useState("");
  const [page, setPage] = useState("");

  useEffect(()=>{
    if(nameImage === ""){
      return
    }
   const newNameImage = nameImage.slice(nameImage.indexOf('/') + 1);
    
    addImages(newNameImage,page);
  },[nameImage, page])

 const addImages = async (newNameImage, page) => {
  
    try {
      setIsLoading(true);
      setError(false);
     
       const listImages = await fetchImages( newNameImage, page);
       setImages(prevImages=>
        [...prevImages, ...listImages.hits]
       )
    
     } catch (error) {
      toast.error('ERORR. Please try reloading this page!');
      setError(true);
     } finally {
       setIsLoading(false);
     }
     }

    const handleSubmit = query => {
      setNameImage(`${Date.now()}/${query}`);
      setImages([]);
      setPage(1);
    };

    const handleLoadMore = () => {
      setPage(prevPage=>
        prevPage + 1
      )
    };
   
      return (
    <div>
      <Searchbar handleSubmit={handleSubmit}/>

      {isLoading && (<Loader/>)}

      {error && (
          <b>Oops! Something went wrong! Please try reloading this page! </b>
        )}

      {images.length > 0 && (<ImageGalery images = {images}/>)}

      {images.length > 0 && (<ButtonLoadMore onClick={handleLoadMore}/>)}

      <ToastContainer />

      <GlobalStyle/>
    </div>
  )
};
