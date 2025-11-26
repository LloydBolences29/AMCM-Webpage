import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
const NewsArticle = () => {
    const { slug } = useParams()
    const { loading, auth } = useAuth();
    const VITE_API_URL = import.meta.env.VITE_API_URL;


    const [article, setArticle] = useState(null)
    

    const fetchArticle = async () =>{
        try{
            const response = await fetch(`${VITE_API_URL}/page/article-page/${slug}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await response.json()
            console.log("Data: ", data)
            if (response.ok){

                setArticle(data.articleData)
            }

        }catch (error){
            console.error("Error fetching article:", error)
        }
    }

    useEffect(() => {
        fetchArticle()
    }, [])
  return (
    <div>
        {article ? (
        <div>
            <h1>{article.title}</h1>
           {article.content_json === null ? (
            <div>
                <p>No content available for this article.</p>
            </div>
           ):(
            <div dangerouslySetInnerHTML={{__html: article.content_json}}></div>
           )}
        </div>
        ): (
        <p>Loading article...</p>
        )}

      
    </div>
  )
}

export default NewsArticle
