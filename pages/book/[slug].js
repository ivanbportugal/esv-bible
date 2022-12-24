import Head from 'next/head';
import Link from 'next/link';
import ErrorPage from 'next/error';
import { getBook, getBooks } from '../../lib/get-json';
import styles from '../../styles/Home.module.css'

export default function Book ({ data = {}}) {

  const theContent = data;
  if (!theContent.verses) {
    return <ErrorPage statusCode={403} />
  }

  const listOfAll = theContent.verses.map(({ chapterName, unique }) => {
    const url = `/read/${unique}`;
    // if (!currentBookName || currentBookName !== bookName) {
    //   currentBookName = bookName;
      // link to each book, down the page
      // const anchor = `#${bookName}`;
      // allBooks.push(<li key={unique} className={styles.booklist}>
      //   <a href={anchor}>{bookName}</a>
      // </li>);
      // // Goes to the ACTUAL text (but this is the anchor location)
      // return <li key={unique} id={bookName} className={styles.booklist}>
      //   <Link href={url}><a>{bookName} {chapterName}</a></Link>
      // </li>
    // }
    // Goes to the ACTUAL text (no anchor)
    return <li key={unique} className={styles.chapterlist}>
      <Link href={url}><a>{chapterName}</a></Link>
    </li>
  });
  
  return (
    <div className={styles.container}>
      <Head>
        <title>{theContent.bookName}</title>
        <meta name="description" content={`The ESV translation: ${theContent.bookName}`} />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {theContent.bookName}
        </h1>

        <hr />

        <ul className={styles.homelist}>
          {listOfAll}
        </ul>

      </main>

      <footer className={styles.footer}>
          <span className={styles.stylelinks}>Powered by the word of God (and <a target='_blank' rel="noreferrer" href='https://buymeacoffee.com/ivanportugal'>coffee</a>).</span>
      </footer>
    </div>
  )
}

// Need the params here to not get a 404
export async function getStaticProps({ params }) {
  const allBookText = await getBook(params.slug);
  return {
    props: {
      data: allBookText
    }
  }
}

export async function getStaticPaths() {
  const allBooks = await getBooks();
  return {
    paths: allBooks.map((book) => ({ params: { slug: book.bookName } })),
    fallback: true
  }
}