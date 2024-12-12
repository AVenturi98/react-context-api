import { useContext, useState } from 'react'
import style from './Form.module.css'
import GlobalContext from '../../context/context'

const initialFormData = {
    title: '',
    image: '',
    content: '',
    tags: [],
    category: '',
    published: true
}

export default function Form() {

    //use context
    const { categories } = useContext(GlobalContext)

    const [posts, setPosts] = useState([])
    const [formData, setFormData] = useState(initialFormData)

    function handleFormData(e) {
        const key = e.target.name
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value

        const newFormData = {
            ...formData,
            [key]: value
        }
        setFormData(newFormData)
    }

    function addPost(event) {
        event.preventDefault()
        // if (posts.published === false) return setPosts(posts.filter(el => el !== posts === false))

        const newPost = {
            ...formData,
        }

        axios.post('http://localhost:3232/posts/', newPost)
            .then(res => {
                console.log('nuovo post', res)
                setPosts([...posts, res.data])
                setFormData(initialFormData)
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <form onSubmit={addPost} className={style.formData} action="">
                <div className={style.formData}>
                    <label htmlFor="title" className={style.formIT} >Titolo</label>
                    <input id='title' name='title' onChange={handleFormData} value={formData.title} type="text" placeholder='Inserisci il titolo' className={style.formControll} />
                </div>
                <div className={style.formData}>
                    <label htmlFor="content" className={style.formIT}>Contenuto</label>
                    <textarea id='content' name='content' onChange={handleFormData} value={formData.content} type="text" placeholder='Inserisci un contenuto..' className={`${style.formControll} ${style.text_area}`} />
                </div>
                <div className={style.formData}>
                    <label htmlFor="img"><strong>Inserisci un immagine</strong></label>
                    <input type="img" id='img' placeholder='http://' className={style.formControll} />
                </div>
                <div className={style.formData}>
                    <label htmlFor="category" className='formIT'>Categoria</label>
                    <select value={formData.category} name="category" id="category" className={`${style.formControll} ${style.selction}`} onChange={handleFormData}>
                        <option value="">Scegli la categoria</option>
                        {categories.map((categ) => (
                            <option key={categ} value={categ}>{categ}</option>
                        ))}
                    </select>
                </div>
                <div className={style.formData}>
                    <label htmlFor="tags" className={style.formIT}>Tags</label>
                    <input type="text" id='tags' onChange={handleFormData} placeholder='Digita i tags..' className={style.formControll} />
                </div>
                <div>
                    <p><strong>{formData.published && 'Deseleziona per rendere privato' || 'Seleziona per rendere pubblico'} il nuovo post</strong></p><br />
                    <input type="checkbox" id='avaible' name='published' onChange={handleFormData} checked={formData.published} />
                    <label htmlFor="avaible" className={`${style.formIT} ${style.formDataCheck}`}>{formData.published && 'Pubblico' || 'Privato'}</label>
                </div>
                <br />
                <input type="submit" value="Aggiungi" id='add_button_form' />
            </form>
        </>
    )
}