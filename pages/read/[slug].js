import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import ErrorPage from 'next/error';
import { getChapters, getChapter } from '../../lib/get-json';
import styles from '../../styles/Home.module.css'
import { IconButton, Tooltip } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Highlighter from 'react-highlight-words';

export default function Chapter({ data = {} }) {

  const router = useRouter();
  // const theContent = getChapter(data, router.query.slug)

  const highlightedText = router.query.highlight;

  const theContent = data;
  const slug = theContent?.unique;
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  if (!slug || !theContent.verses) {
    return <ErrorPage statusCode={403} />
  }

  const formatText = (text) => {
    if (!highlightedText) {
      return text;
    }
    const searchArray = highlightedText.trim().split(' ');
    return <Highlighter
      searchWords={searchArray}
      autoEscape={true}
      textToHighlight={text}
    />
  }

  const verses = theContent.verses.map((verse) => (
    <span key={verse.verseName}>
      <span className={styles.versenumber}> {verse.verseName} </span>
      <span>{formatText(verse.text)}</span>
    </span>
  ))

  const prev = theContent.prev.link
    ? <Link href={theContent.prev.link}><a className={styles.nextprev}><Tooltip label={theContent.prev.name}><IconButton icon={<ArrowBackIcon />} /></Tooltip></a></Link>
    : <Link href='#'><a className={styles.nextprev}><Tooltip label={theContent.prev.name}><IconButton icon={<ArrowBackIcon />} /></Tooltip></a></Link>
  const next = theContent.next.link
    ? <Link href={theContent.next.link}><a className={styles.nextnext}><Tooltip label={theContent.next.name}><IconButton icon={<ArrowForwardIcon />} /></Tooltip></a></Link>
    : <Link href='#'><a className={styles.nextprev}><Tooltip label={theContent.next.name}><IconButton icon={<ArrowForwardIcon />} /></Tooltip></a></Link>

  return <div className={styles.container}>
    <Head>
      <title>ESV: {theContent.bookName}: {theContent.verseName}</title>
      <meta name="description" content="The ESV translation" />
    </Head>
    <main className={styles.main}>
      <h2 className={styles.subtitle}>{theContent.bookName} {theContent.chapterName}</h2>
      <div className={styles.card}>
        <p className={styles.description}>{verses}</p>
      </div>
    </main>
    <div className={styles.bottomactions}>
      {prev}
      {next}
    </div>
  </div>
}

// Need the params here to not get a 404
export async function getStaticProps({ params }) {
  const allText = await getChapter(params.slug);
  return {
    props: {
      data: allText
    }
  }
}

export async function getStaticPaths() {
  const allBookChapters = await getChapters();
  return {
    paths: allBookChapters.map((bookChapter) => ({ params: { slug: bookChapter.unique } })),
    fallback: true
  }
}
