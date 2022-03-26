import { useState, useEffect } from 'react';
import { Document } from 'flexsearch';
import styles from './Search.module.css';
import Link from 'next/link';
import { IconButton, Input, List, ListItem } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import Highlighter from 'react-highlight-words';

export default function SearchComponent({ renderedData }) {

  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [rawData, _] = useState(renderedData);

  useEffect(() => {
    // load the index on the client
    if (rawData) {
      // Check if the data isn't complete (clicked search from book landing page)
      if (rawData.unique) {
        // This is not the entire text, just a chaper. Let's reload the page and try again.
        location.reload();
      }
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
          const textToIndex = `${bookChapter.bookName} ${bookChapter.chapterName}:${verseName} ${text}`;
          index.add({
            id: uniqueWithVerse,
            content: textToIndex
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

  const formatText = (text) => {
    const searchArray = searchValue.trim().split(' ');
    return <Highlighter
      searchWords={searchArray}
      autoEscape={true}
      textToHighlight={text}
    />
  }

  const renderedSuggestions = suggestions?.map(({ key, text }) => {
    const unique = key.substring(0, key.indexOf(':'));
    const url = `/read/${unique}?highlight=${searchValue}`;
    return <ListItem key={key}>
      <div><Link href={url}><a className={styles.suglink}>{formatText(key)}</a></Link></div>
      <p>{ formatText(text) }</p>
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
