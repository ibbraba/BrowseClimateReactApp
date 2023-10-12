import React from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../../firebase';
import { useState, useEffect } from 'react';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

const ImagesAdminPage = () => {

  const [imageUpload, setImageUpload] = useState(null)
  const [imagesUrls, setImageUrls] = useState([])
  const [imageItems, setImagesItems] = useState([])


  //IMAGE UPLOAD
  const imageListRef = ref(storage, "images/")
  const uploadImage = () => {
    if (imageUpload == null) {
      return;

    }
    console.log("Uploading image ...");
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((image) => {
      getDownloadURL(image.ref).then((url) => {
        setImageUrls((prev) => [...prev, url])
      })

    })
  };


  //FETCHING IMAGES
  useEffect(() => {
    listAll(imageListRef).then((response) => {


      response.items.forEach((item) => {

        getDownloadURL(item).then((url) => {
          console.log(url);
          const urls = [...imagesUrls, url]
          urls.push(url)
          console.log(urls)
          setImageUrls(urls);
          console.log(imagesUrls);
        });
      });
    });


    console.log(imagesUrls);
  }, []);

  async function getimagesItems() {

    const res = await listAll(imageListRef)
    console.log(res.items);
    return res.items
  }

  const getImagesUrls = async () =>  {
       try {
  
        const items = await getimagesItems()
  
        if (items != null) {
          const urls = []
          console.log(items);
          for (const item of items) {
            console.log("Iterating through items ...." + items.length);
    
            const url = await getDownloadURL(item)
            urls.push(url)
            console.log(urls);
          
          
          }

         return urls

        }
  
        
        
      } catch (error) {
        
        console.log(error);
  
      } 
  
    
    



  }









  return (


    <div>

      <Link to={"/admin"} className='btn btn-primary'> Menu administrateur </Link>

      <h1>Gallerie</h1>

      <div className="app">
        <input type='file' onChange={e => setImageUpload(e.target.files[0])}></input>
        <button onClick={uploadImage}>Upload image</button>
      </div>

      {imagesUrls.length > 0 && imagesUrls.map((url) => {
        <>

          <p>{url}</p>
          <img src={url}></img>

        </>
      })

      }

    </div>
  )
}

export default ImagesAdminPage