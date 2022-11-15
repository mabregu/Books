import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export async function getStaticProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/books');
    const data = await res.json();
    
    return {
        props: {
            books: data
        }
    }
}

const BookList = ({ books }) => {
    async function handleDelete(e, id) {
        e.preventDefault();
        
        if (confirm('Are you sure?')) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _method: 'DELETE'
                })
            })
            
            if (res.ok) {
                return location.reload();
            }
        }
    }
            
    
    return (
        <div className={styles.container}>
            <Head>
                <title>Quiosquito</title>
                <meta name="description" content="Ecommerce" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Libros</h1>
            
            {/* <pre>
                {JSON.stringify(books, null, 2)}
            </pre> */}
            
            <ul>
                {books.data.map(book => (
                    <li key={book.id}>
                        <Link href={`/libros/${book.id}`}>
                            {book.title}
                        </Link>
                        {' - '}
                        <Link href={`/libros/${book.id}/editar`}>
                            Editar
                        </Link>
                        {' - '}
                        <form
                            onSubmit={(e) => handleDelete(e, book.id)}
                            style={{ display: 'inline' }}
                        >
                            <button>Eliminar</button>
                        </form>
                    </li>
                ))}
            </ul>
            
            <Link href="/libros/crear">Crear Libro</Link>
        </div>
    )
}

export default BookList