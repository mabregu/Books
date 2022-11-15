import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'

const BookCreate = () => {
    const router = useRouter();
    const [bookTitle, setBookTitle] = useState('');
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        setSubmitting(true);
        
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/books', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: bookTitle
            })
        })
        
        if (res.ok) {
            document.getElementById('book-form').reset();
            setErrors([]);
            setBookTitle('');
            
            return router.push('/libros');
        }
        
        const data = await res.json();
        setErrors(data.errors);
        setSubmitting(false);
    }
    
    return (
        <div className={styles.container}>
            <Head>
                <title>Quiosquito</title>
                <meta name="description" content="Ecommerce" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <h1>Crear Libro</h1>
            
            
            <form id="book-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título</label>
                    <input onChange={e => setBookTitle(e.target.value)}
                        type="text"
                        name="title"
                        id="title"
                        value={bookTitle}
                        disabled={submitting}
                    />
                    {errors.title && (
                        <span style={{ color: 'red', display: 'block' }}>
                            {errors.title}
                        </span>
                    )}
                </div>
                <button
                    disabled={submitting}
                    data-cy="submit-button"
                >
                    {submitting ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            <br/>
            <Link href="/libros">Book List</Link>
        </div>
    )
}

export default BookCreate