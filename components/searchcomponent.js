import { useState, useEffect } from 'react';
import { Document } from 'flexsearch';
import styles from './Search.module.css';
import Link from 'next/link';
import { IconButton, Input, List, ListItem } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function SearchComponent() {

  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  // const [searchOpen, setSearchOpen] = useState(false);

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
            content: uniqueWithVerse + text
          });
          window.searchEngineLookup[uniqueWithVerse] = text;
        }
      }
      console.log(`Finished indexing all ${totalCount} chapters`);
    }

    // Now set the state for the rendering
  }, []);

  function onSearchType(event) {
    setSearchValue(event.target.value)
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
    return <ListItem key={key}>
      <div><Link href={url}><a className={styles.suglink}>{key}</a></Link></div>
      <p>{ text }</p>
    </ListItem>
  });

  const onCloseClicked = () => {
    setSuggestions([]);
    setSearchValue('');
  }

  return <>
    <div className={styles.searchwrapper}>
      <Input value={searchValue} placeholder='Search Anything' onChange={onSearchType} />
      <IconButton icon={<CloseIcon />} onClick={() => onCloseClicked()} />
    </div>
    {suggestions.length > 0 && <List spacing={3} className={styles.suggestions}>
      {renderedSuggestions}
    </List>}
  </>
}
