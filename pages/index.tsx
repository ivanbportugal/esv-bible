import Head from 'next/head';
import NextLink from 'next/link'
import { Avatar, Box, Button, Link, List, ListItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useToast, Wrap } from '@chakra-ui/react'
import styles from '../styles/Home.module.css';
import { getChapters } from '../lib/get-json';
import { getBookMap } from '../lib/get-book-descriptions';
import { getLastVisited } from '../lib/local-data';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home({ data = {} }) {

  const allBookChapters: Array<any> = data as any;
  const toast = useToast();
  const router = useRouter();

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

  useEffect(() => {
    getLastVisited().then(lastVisited => {
      if (lastVisited) {
        toast({
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
          render: () => (
            <Box color='white' p={3} bg='blue.500'>
              <Text fontSize='md'>Pick up where you left off?</Text>
              <Text fontSize='sm'>({lastVisited})</Text>
              <Button size='sm' onClick={() => {
                router.push(lastVisited);
                toast.closeAll();
              }}>{'Let\'s Go!'}</Button>
            </Box>
          ),
        })
      }
    })
  }, [router, toast]);

  return (
    <div className={styles.container}>
      <Head>
        <title>The ESV Bible</title>
        <meta name="description" content="The ESV translation of the Bible. Just the text, no study notes or anything." />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Simple access to awesome text.
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
                <p style={{textDecoration: 'underline'}}>Do you have any study material?</p>
                <p>No, but there are several neat resources online. Start here: <a target='_blank' rel="noreferrer" href='https://bible.org'>Bible.org</a></p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>Do you want money for your work?</p>
                <p>No, but you can always <a target='_blank' rel="noreferrer" href='https://buymeacoffee.com/ivanportugal'>Buy Me a Coffee</a></p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>Do you track my usage?</p>
                <p>Nothing other than standard Google Analytics to see if people are actually using this.</p>
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
