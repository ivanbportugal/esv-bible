import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import ErrorPage from 'next/error';
import { getChapter, getChapters } from '../../lib/get-json';
import styles from '../../styles/Home.module.css'

export default function Chapter({ data = {} }) {

  const router = useRouter();

  const slug = data?.unique;
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  if (!data.verses) {
    console.error('WHAT!?!?! ' + slug, data);
  }

  const verses = data.verses.map((verse) => (
    <span key={verse.verseName}>
      <span className={styles.versenumber}> {verse.verseName} </span>
      <span>{verse.text}</span>
    </span>
  ))

  const prev = data.prev.link ? <Link className={styles.nextprev} href={data.prev.link} title={data.prev.name}>&#8610;</Link> : <Link className={styles.nextprev} href='#' title={data.prev.name}>&#8610;</Link>
  const next = data.next.link ? <Link className={styles.nextprev} href={data.next.link} title={data.next.name}>&#8611;</Link> : <Link className={styles.nextprev} href='#' title={data.next.name}>&#8611;</Link>

  return <div className={styles.container}>
    <Head>
      <title>ESV: {data.bookName}: {data.verseName}</title>
      <meta name="description" content="The ESV translation" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.topactions}>
      <Link href='/'>Index</Link>
    </div>
    <main className={styles.main}>
      <h2 className={styles.subtitle}>{data.bookName} {data.chapterName}</h2>
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
