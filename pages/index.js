import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { getChapters } from '../lib/get-json';
import { useState, useEffect } from 'react';

export default function Home({ data = {} }) {

  const [isAllVisible, setAllVisible] = useState(false);

  const allBookChapters = data
  let currentBookName;
  const allBooks = [];
  const listOfAll = allBookChapters.map(({ bookName, chapterName, unique }) => {
    const url = `/read/${unique}`;
    if (!currentBookName || currentBookName !== bookName) {
      currentBookName = bookName;
      // link to each book, down the page
      const anchor = `#${bookName}`;
      allBooks.push(<li key={unique} className={styles.booklist}>
        <a href={anchor}>{bookName}</a>
      </li>);
      // Goes to the ACTUAL text (but this is the anchor location)
      return <li key={unique} id={bookName} className={styles.booklist}>
        <Link href={url}><a>{bookName} {chapterName}</a></Link>
      </li>
    }
    // Goes to the ACTUAL text (no anchor)
    return <li key={unique} className={styles.chapterlist}>
      <Link href={url}><a>{bookName} {chapterName}</a></Link>
    </li>
  });

  const listenToScroll = () => {
    // Show all the chapters once the user scrolls a little bit
    let heightToShow = 10;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (!isAllVisible && winScroll > heightToShow) {  
      setAllVisible(true);
    } 
  }

  useEffect(() => {
    // in case you navigate to a lower point of the page
    listenToScroll();
    window.addEventListener("scroll", listenToScroll);
    return () => 
       window.removeEventListener("scroll", listenToScroll); 
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>The ESV Bible</title>
        <meta name="description" content="The ESV translation" />
      </Head>

      <div className={styles.searchcontainer}>
        <Link href='/search'><a>Search</a></Link>
      </div>

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
                <p>Only ESV.</p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>I have a feature request and / or see a bug. (Or I just have more questions and comments)</p>
                <p><a href='mailto:ivanbportugal@gmail.com'>Email</a> me or <a target='_blank' rel="noreferrer" href='https://buymeacoffee.com/ivanportugal'>Buy Me a Coffee</a> with your request.</p>
              </li>
            </ul>

          </div>
        </div>

        <hr />

        <ul className={styles.homelist}>
          {allBooks}
        </ul>

        <hr />

        {isAllVisible && <ul className={styles.homelist}>
          {listOfAll}
        </ul>}

      </main>

      <footer className={styles.footer}>
          <span className={styles.stylelinks}>Powered by the word of God (and <a target='_blank' rel="noreferrer" href='https://buymeacoffee.com/ivanportugal'>coffee</a>).</span>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const allText = await getChapters();
  // const noVerses = allText.map(({ bookName, chapterName, unique }) => ({ bookName, chapterName, unique }))
  return {
    props: {
      data: allText
    }
  }
}