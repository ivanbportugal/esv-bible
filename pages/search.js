import Head from 'next/head';
import styles from '../styles/Search.module.css';
import SearchComponent from '../components/searchcomponent';
import { getChapters } from '../lib/get-json';

export default function Search({ data = {}}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>The ESV Bible - Search</title>
        <meta name="description" content="The ESV translation, search" />
      </Head>
      <main className={styles.searchmain}>
        <SearchComponent renderedData={data} />
      </main>
    </div>
  )
}

// Need this data in memory in the SearchComponent
export async function getStaticProps() {
  const allText = await getChapters();
  return {
    props: {
      data: allText
    },
    revalidate: 60 * 60 * 24 * 7 // 1 week
  }
}
