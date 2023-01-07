import { useRouter } from 'next/router';
import Head from 'next/head';
import NextLink from 'next/link';
import ErrorPage from 'next/error';
import { getChapters, getChapter } from '../../lib/get-json';
import styles from '../../styles/Home.module.css'
import { Button, IconButton, Link, Tooltip, useToast } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import Highlighter from 'react-highlight-words';
import { setLastVisited } from '../../lib/local-data';
import { useEffect } from 'react';

/**
 * Responsible for rendering an entire chapter
 * 
 * @param param0 
 * @returns 
 */
export default function Chapter({ data = {} }) {

  const router = useRouter();
  const toast = useToast();

  // Possible query params for highlighting
  const highlightedVerse = router.query.verse as string;
  const highlightedText = router.query.highlight as string;

  const theContent = data as any;
  const slug = theContent?.unique;

  useEffect(() => {
    setLastVisited(router.asPath);
  }, [router]);

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  if (!slug || !theContent.verses) {
    return <ErrorPage statusCode={403} />
  }

  /**
   * Determines whether a verse should be highlighted or not (or in part).
   * 
   * @param text 
   * @param verseName 
   * @returns 
   */
  const formatText = (text: string, verseName?: string) => {
    if (highlightedVerse) {
      // Comma-separated, possibly
      const versesToHighlight = highlightedVerse.split(',');
      const found = versesToHighlight.find(toFind => toFind == verseName);
      if (found) {
        return <Highlighter
          searchWords={[text]}
          autoEscape={true}
          textToHighlight={text}
        />
      }
      return text;
    } else if (highlightedText) {
      // Highlight each word
      const searchArray = highlightedText.trim().split(' ');
      return <Highlighter
        searchWords={searchArray}
        autoEscape={true}
        textToHighlight={text}
      />
    } else {
      // No highlighted text at all
      return text;
    }
  }

  const shareVerse = async (verseName: string) => {
    const url = `${window.origin}${router.basePath}/read/${slug}?verse=${verseName}`;
    try {
      if (navigator.share) {
        await navigator.share({
          text: `Share verse ${verseName}`,
          url: url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        toast({
          title: 'Copied verse URL.',
          description: '',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
      } else {
        console.log('Couldn\'t share the url');
        toast({
          title: 'Could not grab URL.',
          description: 'There was an error trying to get the URL on your clipboard. Please try again later...',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    } catch (_) {
      // This can be ignored (the user cancelled the share operation)
    }
  }

  const shareVerseDialog =async (verseName: string) => {
    
  }

  const verses = theContent.verses.map((verse) => (
    <span key={verse.verseName}>
      <span onClick={() => shareVerse(verse.verseName)} className={styles.versenumber}> {verse.verseName} </span>
      <span>{formatText(verse.text, verse.verseName)}</span>
    </span>
  ))

  const prev = theContent.prev.link
    ? <Link as={NextLink} passHref href={theContent.prev.link}><a className={styles.nextprev}><Tooltip label={theContent.prev.name}><IconButton aria-label='Previous' icon={<ArrowBackIcon />} /></Tooltip></a></Link>
    : <Link as={NextLink} passHref href='#'><a className={styles.nextprev}><Tooltip label={theContent.prev.name}><IconButton aria-label='Previous' icon={<ArrowBackIcon />} /></Tooltip></a></Link>
  const next = theContent.next.link
    ? <Link as={NextLink} passHref href={theContent.next.link}><a className={styles.nextnext}><Tooltip label={theContent.next.name}><IconButton aria-label='Next' icon={<ArrowForwardIcon />} /></Tooltip></a></Link>
    : <Link as={NextLink} passHref href='#'><a className={styles.nextprev}><Tooltip label={theContent.next.name}><IconButton aria-label='Next' icon={<ArrowForwardIcon />} /></Tooltip></a></Link>

  return <div className={styles.container}>
    <Head>
      <title>ESV: {theContent.bookName} {theContent.chapterName}</title>
      <meta name="description" content="The ESV translation" />
    </Head>
    <Button leftIcon={<ArrowLeftIcon />} className={styles.bookindexbutton} size='sm'>
      <Link as={NextLink} href={`/book/${theContent.bookName}`} passHref>
        {theContent.bookName}
      </Link>
    </Button>
    <main className={styles.main}>
      <h2 className={styles.subtitle}>{formatText(theContent.bookName)} {formatText(theContent.chapterName)}</h2>
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
    },
    revalidate: 60 * 60 * 24 // 1 day
  }
}

export async function getStaticPaths() {
  const { thebookchapters } = await getChapters();
  return {
    paths: thebookchapters.map((bookChapter) => ({ params: { slug: bookChapter.unique } })),
    fallback: 'blocking'
  }
}
