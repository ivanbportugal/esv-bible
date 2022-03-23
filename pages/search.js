import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SearchComponent from '../components/searchcomponent';

export default function Search() {

  return (
    <div className={styles.container}>
      <Head>
        <title>The ESV Bible - Search</title>
        <meta name="description" content="The ESV translation, search" />
      </Head>
      <main className={styles.main}>
        <SearchComponent />
      </main>
    </div>
  )
}

// export async function getStaticProps() {
//   const allText = await getChapters();
//   return {
//     props: {
//       data: allText
//     }
//   }
// }