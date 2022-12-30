import Head from 'next/head';
import NextLink from 'next/link'
import { Avatar, Link, List, ListItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Wrap } from '@chakra-ui/react'
import styles from '../styles/Home.module.css';
import { getChapters } from '../lib/get-json';
import { getBookMap } from '../lib/get-book-descriptions';

export default function Home({ data = {} }) {

  const allBookChapters: Array<any> = data as any;

  const renderBooks = allBookChapters.map(({ bookName }) => {
    const url = `/book/${bookName}`;
    const bookMeta = getBookMap(bookName);
    return <ListItem key={bookName}>
      <Wrap className={styles.booklist}>
        <Popover>
          <PopoverTrigger>
            <Avatar name={bookMeta.category} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight='semibold'>{bookMeta.category}</PopoverHeader>
            <PopoverBody>
              {bookMeta.author} - {bookMeta.date}
            </PopoverBody>
          </PopoverContent>
          <Link as={NextLink} href={url} passHref>
            {bookName}
          </Link>
        </Popover>
      </Wrap>
    </ListItem>
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>The ESV Bible</title>
        <meta name="description" content="The ESV translation" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Just simple access to awesome text.
        </h1>

        <div className={styles.description}>
          <div className={styles.card}>
            <p style={{fontWeight: 'bold'}}>FAQs</p>
            <ul className={styles.stylelinks}>
              <li>
                <p style={{textDecoration: 'underline'}}>Why another bible app?</p>
                <p>Because I felt like it.</p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>Ok but, why should I use yours and not some other one?</p>
                <p>No app to download. Can be installed on your home screen. No account is needed. Searches are done on the browser.</p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>Do you want money for your work?</p>
                <p>No. But you can always <a target='_blank' rel="noreferrer" href='https://buymeacoffee.com/ivanportugal'>Buy Me a Coffee</a></p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>Do you track my usage?</p>
                <p>No. But more importantly, not possible (This is a simple web app. There is no server).</p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>Which translations do you support</p>
                <p>Only <a target='_blank' rel="noreferrer" href='https://www.esv.org/'>ESV</a> for now.</p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>I have a feature request and / or see a bug. (Or I just have more questions and comments)</p>
                <p><a href='mailto:ivanbportugal@gmail.com'>Email</a> me or <a target='_blank' rel="noreferrer" href='https://buymeacoffee.com/ivanportugal'>Buy Me a Coffee</a> with your request.</p>
              </li>
            </ul>

          </div>
        </div>

        <hr />

        <List spacing={5} className={styles.homelist}>
          {renderBooks}
        </List>

      </main>

      <footer className={styles.footer}>
          <span className={styles.stylelinks}>Powered by the word of God (and <a target='_blank' rel="noreferrer" href='https://buymeacoffee.com/ivanportugal'>coffee</a>).</span>
      </footer>
    </div>
  )
}

// Keep __NEXT_DATA__ hydrated with the text no matter which landing page
export async function getStaticProps() {
  const { thebooks } = await getChapters();
  const onlyNames = thebooks.map(book => {
    return {
      bookName: book.bookName
    }
  })
  return {
    props: {
      data: onlyNames
    }
  }
}
