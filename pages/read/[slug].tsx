import { useRouter } from 'next/router';
import Head from 'next/head';
import NextLink from 'next/link';
import ErrorPage from 'next/error';
import { getChapters, getChapter } from '../../lib/get-json';
import styles from '../../styles/Home.module.css'
import { Box, Button, IconButton, Link, Text, createToaster, Toaster } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import Highlighter from 'react-highlight-words';
import { setLastVisited } from '../../lib/local-data';
import { useEffect, useReducer, useRef, useState } from 'react';

// Create toaster instance
const toaster = createToaster({
  placement: 'bottom',
  duration: 5000,
});

/**
 * Responsible for rendering an entire chapter
 * 
 * @param param0 
 * @returns 
 */
export default function Chapter({ data = {} }) {

  const router = useRouter();
  const toastIdRef = useRef<any>(undefined);

  // Possible query params for highlighting
  const highlightedVerse = router.query.verse as string;
  const highlightedText = router.query.highlight as string;

  const theContent = data as any;
  const slug = theContent?.unique;

  const [versesAboutToShare, setVersesAboutToShare] = useState(new Set());
  const forceUpdate = useReducer(() => ({}), {})[1] as () => void

  useEffect(() => {
    setLastVisited(router.asPath);
  }, [router]);

  useEffect(() => {
    if (versesAboutToShare.size > 0) {
      const commaSep = Array.from(versesAboutToShare).join(',');
      if (toastIdRef.current) {
        // Already open
        toaster.update(toastIdRef.current, {
          description: commaSep,
          render: () => shareToastContent(commaSep)
        })
        return;
      }

      // TODO may need a regular modal for this. Try to make the component stand alone
      // because toast doesn't appear to be rerendered on a hook

      // First time it is opened
      toastIdRef.current = toaster.create({
        type: 'info',
        duration: 60000, // Arbitrarily large
        position: 'bottom',
        description: commaSep,
        render: () => shareToastContent(commaSep),
      })
    } else {
      // Nothing to share, close the toast
      destroyToast()
    }
  }, [versesAboutToShare, toastIdRef]);

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
          text: `Share verse(s) ${verseName}`,
          url: url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        toaster.create({
          title: `Copied verse(s) ${verseName}`,
          description: '',
          type: 'success',
          duration: 5000,
        });
      } else {
        console.log('Couldn\'t share the url');
        toaster.create({
          title: 'Could not grab URL.',
          description: 'There was an error trying to get the URL on your clipboard. Please try again later...',
          type: 'error',
          duration: 5000,
        });
      }
    } catch (_) {
      // This can be ignored (the user cancelled the share operation)
    }
  }

  const shareVerseDialog = (verseName: string) => {
    const newVerseArray = new Set(versesAboutToShare);
    newVerseArray.add(verseName);
    setVersesAboutToShare(newVerseArray);
    forceUpdate();
  }

  const destroyToast = () => {
    if (toastIdRef.current) {
      toaster.dismiss(toastIdRef.current)
      toastIdRef.current = undefined
      setVersesAboutToShare(new Set())
    }
  }

  const shareToastContent = (description: any) => {
    return (
      <Box color='white' p={3} bg='blue.800'>
        <Text fontSize='md'>Ready to share verse(s)</Text>
        <Text fontSize='sm'>({description})</Text>
        <Button size='sm' colorScheme={'teal'} className={styles.sharetoastbutton} onClick={() => {
          shareVerse(description as any);
          destroyToast()
        }}>{'Share'}</Button>
        <Button size='sm' colorScheme={'teal'} className={styles.sharetoastbutton} onClick={() => {
          destroyToast()
        }}>{'Cancel'}</Button>
      </Box>
    )
  }

  const verses = theContent.verses.map((verse) => (
    <span key={verse.verseName}>
      <span onClick={() => shareVerseDialog(verse.verseName)} className={styles.versenumber}> {verse.verseName} </span>
      <span>{formatText(verse.text, verse.verseName)}</span>
    </span>
  ))

  const prev = theContent.prev.link
    ? <Link asChild href={theContent.prev.link} className={styles.nextprev}>
        <IconButton aria-label={theContent.prev.name}><ArrowBackIcon /></IconButton>
      </Link>
    : <Link asChild href='#' className={styles.nextprev}>
        <IconButton aria-label={theContent.prev.name} disabled><ArrowBackIcon /></IconButton>
      </Link>
  const next = theContent.next.link
    ? <Link asChild href={theContent.next.link} className={styles.nextnext}>
        <IconButton aria-label={theContent.next.name}><ArrowForwardIcon /></IconButton>
      </Link>
    : <Link asChild href='#' className={styles.nextprev}>
        <IconButton aria-label={theContent.next.name} disabled><ArrowForwardIcon /></IconButton>
      </Link>
  return <div className={styles.container}>
    <Head>
      <title>{`ESV: ${theContent.bookName} ${theContent.chapterName}`}</title>
      <meta name="description" content="The ESV translation" />
    </Head>
    <Button className={styles.bookindexbutton} size='sm'>
      <Link asChild href={`/book/${theContent.bookName}`}>
        <span><ArrowLeftIcon /> {theContent.bookName}</span>
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
