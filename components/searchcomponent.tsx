import { useState, useEffect } from 'react';
import { Document } from 'flexsearch';
import styles from './Search.module.css';
import Link from 'next/link';
import { IconButton, Input, List, ListItem } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import Highlighter from 'react-highlight-words';
import { indexText } from '../lib/index-gen';

export default function SearchComponent({ renderedData }) {

  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [rawData, _] = useState(renderedData);

  const [searchEngine, setSearchEngine] = useState<any>();
  const [theSearchEngineLookup, setTheSearchEngineLookup] = useState();

  useEffect(() => {
    // load the index on the client
    if (rawData) {
      // Check if the data isn't complete (clicked search from book landing page)
      if (rawData.unique) {
        // This is not the entire text, just a chaper. Let's reload the page and try again.
        location.reload();
      }
      const theData = (rawData.thebookchapters) ? rawData.thebookchapters : rawData;
      const { index, searchEngineLookup } = indexText(theData);
      setSearchEngine(index);
      setTheSearchEngineLookup(searchEngineLookup as any);
    }

    // Now set the state for the rendering
  }, [rawData]);

  function onSearchType(event) {
    setSearchValue(event.target.value)
    if (searchEngine && theSearchEngineLookup) {
      setSuggestions([]);
      const term = event.target.value;
      const results = searchEngine.search(term, { limit: 20, enrich: true, suggest: true });

      if (results && results.length > 0) {
        const resultset = results[0];
        const finalset = resultset.result;
        // This should be an array of strings, let's make it into a map
        const finalLookup = finalset.map((theKey) => ({ key: theKey, text: theSearchEngineLookup[theKey] }));
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

  // Escape key
  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.code === 'Escape') {
        onCloseClicked();
      }
    }
    document.addEventListener("keydown", keyDownHandler);

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return <>
    <div className={styles.searchwrapper}>
      <Input value={searchValue} placeholder='Search Anything' onChange={onSearchType} />
      <IconButton aria-label='Cancel' icon={<CloseIcon />} onClick={() => onCloseClicked()} />
    </div>
    {suggestions.length > 0 && <List spacing={3} className={styles.suggestions}>
      {renderedSuggestions}
    </List>}
  </>
}
