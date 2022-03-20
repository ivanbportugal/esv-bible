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

  if (!slug || !data.verses) {
    return <ErrorPage statusCode={403} />
  }

  const verses = data.verses.map((verse) => (
    <span key={verse.verseName}>
      <span className={styles.versenumber}> {verse.verseName} </span>
      <span>{verse.text}</span>
    </span>
  ))

  const prev = data.prev.link
    ? <Link href={data.prev.link}><a title={data.prev.name} className={styles.nextprev}>&#8610;</a></Link>
    : <Link href='#'><a title={data.prev.name} className={styles.nextprev}>&#8610;</a></Link>
  const next = data.next.link
    ? <Link href={data.next.link}><a title={data.next.name} className={styles.nextprev}>&#8611;</a></Link>
    : <Link href='#'><a title={data.next.name} className={styles.nextprev}>&#8611;</a></Link>

  return <div className={styles.container}>
    <Head>
      <title>ESV: {data.bookName}: {data.verseName}</title>
      <meta name="description" content="The ESV translation" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.topactions}>
      <Link href='/'><a>Index</a></Link>
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
