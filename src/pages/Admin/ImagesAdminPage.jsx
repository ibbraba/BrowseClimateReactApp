import React from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../../firebase';
import { useState, useEffect } from 'react';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';
import { DecodeUser, GetToken } from '../../compenents/LoginComponent';
import Form from 'react-bootstrap/Form';
import { Checkbox } from '@mui/material';

const ImagesAdminPage = () => {

  const [imageUpload, setImageUpload] = useState(null)
  const [imagesUrls, setImageUrls] = useState(null)
  const [selectedImageURL, setSelectedImageURL] = useState(null)
  const [cities, setCities] = useState(null)
  const [selectedCity, setSelectedCIty] = useState("all")
  const [permission, setpermission] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  useState(() => {

    verifyAdminPermission()

  }, [])

  useState(() => {

  }, [permission])


  async function verifyAdminPermission() {
    const token = GetToken()
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/User/validate")
      if (res.status != 200) {
        setpermission(false)
        console.log("Permission Denied");
      }

      const user = DecodeUser()
      console.log(user);

      if (user.role == "Admin") {

        setpermission(true)
        console.log("Permission OK");
        return

      }

      console.log("Permission Denied");
      setpermission(false)
    }
  }


  //IMAGE UPLOAD


  const uploadImage = async () => {

    console.log(isChecked);


    if (imageUpload != null) {
      console.log("Uploading image ...");
      if (isChecked) {

        const folderRef = ref(storage, `/city/${selectedCity.trim()}/presentation`);

        const res = await listAll(folderRef)
        console.log(res);






        if (res.items[0] && imageUpload) {

          deleteObject(ref(storage, `/city/${selectedCity.trim()}/presentation/main`))


        }

        const imageRef = ref(storage, `/city/${selectedCity.trim()}/presentation/main`);



        uploadBytes(imageRef, imageUpload).then((image) => {
          getDownloadURL(image.ref).then((url) => {
            setImageUrls((prev) => [...prev, url])
          })

        })


      } else {
        const imageRef = ref(storage, `/city/${selectedCity.trim()}/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((image) => {
          const fileLocation = image.ref._location.path_
          getDownloadURL(image.ref).then((url) => {
            setImageUrls((prev) => [...prev, {fileLocation, url}])
          })

        })
      }


    }


  };

  useEffect(() => {
    console.log("SELECTED CITY CHANGES");
    console.log(selectedCity);
    getImagesUrls()
  }, [selectedCity])

  //FETCHING IMAGES
  useEffect(() => {
    GetAllCities()
    getImagesUrls()
    console.log(cities);
    console.log(imagesUrls);
  }, []);

  useEffect(() =>{

  }, [imagesUrls])

  async function GetAllCities() {
    try {

      console.log("call cities");
      const response = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/City/GetAll")
      setCities(response.data)

      console.log("End call cities");
    } catch (error) {

      console.log(error);
    }
  }



  async function getimagesItems() {

    let imageListRef = ""

    if (selectedCity != null && selectedCity != "all") {

      imageListRef = ref(storage, `/city/${selectedCity.trim()}`)
    } else {
      imageListRef = ref(storage, `/city`)
    }
    const res = await listAll(imageListRef)
    return res.items
  }

  const getImagesUrls = async () => {
    try {

      const items = await getimagesItems()

      const mainRef = ref(storage, `/city/${selectedCity.trim()}/presentation`);
      const res = await listAll(mainRef)
      console.log(res);
      if(res.items[0]){
        items.push(res.items[0])
      }


      if (items != null) {
        console.log(items);
        const images = []

        for (const item of items) {
          const fileLocation = items[0]._location.path_
     
          const url = await getDownloadURL(item)
          const image = {fileLocation, url}
          images.push(image)

        }

        console.log(images);
        setImageUrls(images)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteImage(image) {

    
    console.log(image.fileLocation);
    if(window.confirm("Supprimer l'image ?")){

      try {

        deleteObject(ref(storage, image.fileLocation))
        console.log("Deleted");

        let newImages = [...imagesUrls]

        newImages = newImages.filter(function( img ) {
          return img.url !== image.url 
        });


       // console.log(newImages);
      //  const index = newImages.indexOf(x => x.url == image.url)
       // console.log(index);
      //  newImages.splice(index, 1)
     //   console.log(newImages);
        setImageUrls(newImages)
        
      } catch (error) {
        console.log(error);
      }
    }


  }

  






  return (


    <div>

      {!permission && <div className='alert alert-danger'>  <h3>Vous n'avez pas les droits d'accés à cette ressource.</h3>
        <Link to="/" className='btn lbutton darkbg'> Retour à l'acceuil</Link>

      </div>}

      {permission && <>

        <Link to={"/admin"} className='darkbg  btn lbutton'> Menu administrateur </Link>

        <h1>Gallerie</h1>

        <img className='app-photo' src='https://firebasestorage.googleapis.com/v0/b/browseclimate.appspot.com/o/app%2Fmuseum.jpg?alt=media&token=01c5d67d-3998-4ab3-a5b9-14f2a5d48b0e'></img>

        <div className="admin-gallerie">

          <h3>Uploader une image</h3>
          <select className='admin-city-select' onChange={(e) => setSelectedCIty(e.target.value)} name="" id="">

            <option value="all" > Choisir une ville </option>
            {cities && cities.map(city => (
              <option value={city.name} key={city.id}> {city.name}</option>
            ))}


          </select>

          <input className='gallerie-input' type='file' onChange={e => { setImageUpload(e.target.files[0]) }}></input>
          {imageUpload && <p> {imageUpload.name} </p>}
          {console.log(imagesUrls)}
          <div className='form-group my-2'>
            <label className='btn-primary' htmlFor=""> Choisir comme image principale </label>
            <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
          </div>

          <button className='darkbg  btn lbutton' onClick={uploadImage}>Envoyer l'image</button>


        </div>
        {imagesUrls && imagesUrls.map(image => (


          <div className='admin-image' key={image.url}>

 

            <img className='app-photo' src={image.url}></img>


            <div>
              <button className='btn btn-danger mb-5' onClick={(e) => {
                DeleteImage(image)       
              }}>Supprimer</button>


            </div>

          </div>
        ))

        }

      </>}
    </div>
  )
}

export default ImagesAdminPage