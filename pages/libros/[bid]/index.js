import Link from "next/link"

export async function getStaticPaths() {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/books');
    const data = await res.json();
    
    const paths = data.data.map(book => ({
        params: { bid: book.id.toString() }
    }))
    
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(content) {
    const { bid } = content.params;
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/books/' + bid);
    const data = await res.json();
    
    return {
        props: {
            book: data
        }
    }
}

const BookDetail = ({ book }) => {
    return (
        <div>
            <h1>{book.title}</h1>
            
            <Link href="/libros">Book List</Link>
        </div>
    )
}

export default BookDetail