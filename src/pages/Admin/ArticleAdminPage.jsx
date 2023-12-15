import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DecodeUser, GetToken } from '../../compenents/LoginComponent';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../firebase';

const ArticleAdminPage = () => {

    const [articles, setArticles] = useState(null)
    const [user, setuser] = useState(null)
    const [permission, setpermission] = useState(false)
    const [imgLoaded, setImgLoaded] = useState(false)

    const [successMessage, setSuccesMessage] = useState(null)
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


    useEffect(() => {

        
        verifyAdminPermission()
        async function getArticles() {

            const articles = await AllArticles()
      
            setArticles(articles)
        }

        getArticles()

    }, [])

    useEffect(() => {
        
        if(articles && !imgLoaded){
           
            GetArticleImage()
            console.log(articles);

        }


    }, [articles, imgLoaded])

    async function AllArticles() {
        try {
            console.log("Call all Articles");
            const response = await axios.get("https://browseclimate20231121101412.azurewebsites.net/api/Article/GetAll")

            return response.data


        } catch (err) {
            console.log(err);
        }
    }


    async function DeleteArticle(articleId) {


        if (window.confirm("Supprimer l'article?")) {
            
            

            try {
                const token = GetToken()
    
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.post("https://browseclimate20231121101412.azurewebsites.net/api/Article/Delete?id=" + articleId)
                setSuccesMessage("Article supprimé !")
                
                console.log(response);
                
            } catch (error) {
                console.log(error);
            }
    
          }
   
    }


    async function GetArticleImage() {

        const newArticles = [...articles]


        for (const article of newArticles) {
            let imageListRef = ref(storage, `/articles/${article.id}`)

            const res = await listAll(imageListRef)
            

            if (res.items[0]) {
                console.log(res);
                console.log("Image on article " + article.id);
                const url = await getDownloadURL(res.items[0])
                article.imageURL = url;
                console.log(article);

            }
        }

        console.log(articles);
        setImgLoaded(true)
        setArticles(newArticles)
    }


    return (

        <div>

            {!permission && <div className='alert alert-danger'>  <h3>Vous n'avez pas les droits d'accés à cette ressource.</h3>
                <Link to="/" className='btn lbutton darkbg'> Retour à l'acceuil</Link>

            </div>}
            {permission && <>

            {successMessage && <div className='alert alert-success'> {successMessage} </div>}

            <Link to={"/admin"} className='btn lbutton darkbg'> Menu administrateur </Link>

            <h1 className='my-4'>Tous les articles</h1>

            {articles && articles.map(article => (
                <div className='article-container' key={article.id} >
                    <h4 className='article-title '> {article.title}</h4>
                    {article.imageURL && <img className='article-image' src={article.imageURL} />}
                    {!article.imageURL && <img className='article-image' src="../src/assets/images/app/articles/telescope.jpg" />}
                    <div className='article-description'>{article.description}</div>
                    <div>{article.content}</div>
                    <Link to={"/article/" + article.id} className='btn mbutton lightbg'> Lire </Link>   
                    <Link to={"/article/edit/" + article.id} className='btn mbutton lightbg'> Editer  </Link>
                    <Link onClick={() => DeleteArticle(article.id)} className='btn mbutton lightbg'> Supprimer </Link>

                </div>
            )


            )}

            </>}
        </div>
    )
}

export default ArticleAdminPage