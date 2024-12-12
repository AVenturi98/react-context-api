import { useState, useEffect, useContext } from 'react'
import Card from '../card/Card'
import Form from '../form/Form'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import GlobalContext from '../../context/context'


export default function mainSection() {

    const { categories, posts, fetchPosts, deletePost } = useContext(GlobalContext)


    const [isOpen, setIsOpen] = useState(true)


    useEffect(() => {
        fetchPosts()
    }, [])



    function openMenu() {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div className="container">
                <div className='flexItem'>
                    <h1>Ricette versatili -</h1>
                    <button type='button' onClick={openMenu} className={isOpen ? `${'iconFA'} ${'tooltip'}` : `iconMin`}> {isOpen ? <FontAwesomeIcon icon={faPlus} /> : <FontAwesomeIcon icon={faMinus} />}
                        <span className={isOpen ? 'tooltiptext' : `d-none`}>Aggiungi</span></button>
                </div>
                <div className="row">
                    <div className={isOpen ? 'd-none' : 'col-100'}>
                        <h2>Inserisci una nuova ricetta</h2>
                        <Form />
                    </div>
                    <div>
                        <ul>
                            {categories.map((categ) => (
                                <li key={categ}>
                                    <button>{categ}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {posts.map((post) =>
                        <div key={post.id} className="col-6">
                            <Card callBack={() => deletePost(post)} title={post.title} content={post.content} tags={post.tags} published={post.published} image={post.image} id={post.id} />
                        </div>
                    )}
                </div >
            </div >
        </>

    )
}