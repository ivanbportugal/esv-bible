import { useState, useEffect } from 'react';
import { Document } from 'flexsearch';
import styles from './Search.module.css';
import Link from 'next/link';
import SearchIcon from './searchicon';

export default function SearchComponent() {

  const [suggestions, setSuggestions] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // load the index on the client
    const rawData = window.__NEXT_DATA__?.props?.pageProps?.data;
    if (rawData) {
      const index = new Document({
        doc: {
          id: 'id',
          field: ['content']
        }
      });
      window.searchEngine = index;
      window.searchEngineLookup = {};
      // add each to index
      const totalCount = rawData.length;
      for (const bookChapter of rawData) {
        const unique = bookChapter.unique;
        
        for (const { verseName, text } of bookChapter.verses) {
          const uniqueWithVerse = `${unique}:${verseName}`;
          index.add({
            id: uniqueWithVerse,
            content: text
          });
          window.searchEngineLookup[uniqueWithVerse] = text;
        }
      }
      console.log(`Finished indexing all ${totalCount} chapters`);
    }

    // Now set the state for the rendering
  }, []);

  function onSearchType(event) {
    if (window.searchEngine) {
      setSuggestions([]);
      const term = event.target.value;
      const results = window.searchEngine.search(term, { limit: 20, enrich: true, suggest: true });

      if (results && results.length > 0) {
        const resultset = results[0];
        const finalset = resultset.result;
        // This should be an array of strings, let's make it into a map
        const finalLookup = finalset.map((theKey) => ({ key: theKey, text: window.searchEngineLookup[theKey] }));
        setSuggestions(finalLookup);
      }
    }
  }

  const renderedSuggestions = suggestions?.map(({ key, text }) => {
    const unique = key.substring(0, key.indexOf(':'));
    const url = `/read/${unique}`;
    return <li key={key} className={styles.suglink}>
      <Link href={url}><a>{key}</a></Link>
      <span>{ text }</span>
    </li>
  });

  const toggleSearch = (value) => {
    setSearchOpen(value);
    setSuggestions([]);
  }

  const renderedSearch = searchOpen
    ? (<><input type="text" autoFocus onChange={onSearchType} placeholder='Search Anything' />
      <button onClick={() => toggleSearch(false)} className={styles.exicon}>x</button></>)
    : <><span></span><button onClick={() => toggleSearch(true)} className={styles.searchicon}><SearchIcon /></button></>;

  return <>
    <div className={styles.searchwrapper}>
      {renderedSearch}
    </div>
    {suggestions.length > 0 && <ul className={styles.suggestions}>
      {renderedSuggestions}
    </ul>}
  </>
}