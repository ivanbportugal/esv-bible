import Head from 'next/head';
import NextLink from 'next/link'
import ErrorPage from 'next/error';
import { Link, ListItem, List } from '@chakra-ui/react';
import { getBook, getChapters } from '../../lib/get-json';
import styles from '../../styles/Home.module.css'

export default function Book ({ data = {}}) {

  const theContent = data;
  if (!theContent.chapters) {
    return <ErrorPage statusCode={403} />
  }

  const listOfAll = theContent.chapters.map(({ chapterName }) => {
    const unique = `${theContent.bookName}-${chapterName}`;
    const url = `/read/${unique}`;

    return <ListItem key={chapterName} className={styles.booklist}>
        <Link as={NextLink} href={url} passHref>
          {chapterName}
        </Link>
      </ListItem>
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

        <List spacing={3} className={styles.homelist}>
          {listOfAll}
        </List>

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
  const { thebooks } = await getChapters();
  return {
    paths: thebooks.map((book) => ({ params: { slug: book.bookName } })),
    fallback: true
  }
}