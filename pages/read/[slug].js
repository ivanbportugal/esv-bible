import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import ErrorPage from 'next/error';
import { getChapters, getChapter } from '../../lib/get-json';
import styles from '../../styles/Home.module.css'
import { IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Highlighter from 'react-highlight-words';

export default function Chapter({ data = {} }) {

  const router = useRouter();
  const toast = useToast();

  const highlightedVerse = router.query.verse;
  const highlightedText = router.query.highlight;

  const theContent = data;
  const slug = theContent?.unique;
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  if (!slug || !theContent.verses) {
    return <ErrorPage statusCode={403} />
  }

  const formatText = (text, verseName) => {
    if (highlightedVerse) {
      if (highlightedVerse == verseName) {
        // Verse selected in route
        return <Highlighter
          searchWords={[text]}
          autoEscape={true}
          textToHighlight={text}
        />
      } else {
        // Verse not found from route
        return text;
      }
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

  const shareVerse = async (verseName) => {
    const url = `${window.origin}${router.basePath}/read/${slug}?verse=${verseName}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Share verse ${verseName}`,
          text: url,
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
    } catch (e) {
      console.log('Couldn\'t share the url', e);
      toast({
        title: 'Could not grab URL to share',
        description: 'There was an error trying to share or get the URL to your clipboard (you may have cancelled the operation).',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  }

  const verses = theContent.verses.map((verse) => (
    <span key={verse.verseName}>
      <span onClick={() => shareVerse(verse.verseName)} className={styles.versenumber}> {verse.verseName} </span>
      <span>{formatText(verse.text, verse.verseName)}</span>
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
