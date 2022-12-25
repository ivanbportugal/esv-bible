const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

const filepath = path.resolve(process.cwd(), 'lib/esv.xml');
let thejson;
let thebooks;
let thebookchapters;

// Only for use within bible
const readIt = async () => {
  const parser = new xml2js.Parser();
  try {
    const data = await fs.promises.readFile(filepath);
    const result = await parser.parseStringPromise(data);
    console.log('done reading all of it');
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Only for use within readChapters
const bible = async () => {
  if (!thejson) {
    thejson = await readIt();
  }
  return thejson;
}

const parseChapters = (chapters) => {
  return chapters.map((chapter) => {
    const chapterName = chapter.$.name;
    const verses = chapter.verse;
    return { chapterName, verses };
  });
}

const readBooks = async () => {
  const allOfIt = await bible();
  const toReturn = allOfIt.bible.book.map((book) => {
    const bookName = book.$.name;
    const chapters = parseChapters(book.chapter);
    return { bookName, chapters };
  });
  return toReturn;
}

// Only for use within getChapters
const readChapters = async () => {
  const books = await getBooks();
  // One HTML page per book / chapter (over 1k entries)
  const bookChapters = [];
  for (const book of books) {
    const { bookName, chapters } = book;
    for (const { chapterName, verses } of chapters) {

      const toAdd = {
        unique: `${bookName}-${chapterName}`,
        bookName,
        chapterName,
        verses: []
      };
      for (const verse of verses) {
        const verseName = verse.$.name;
        const text = verse._;
        const verseToAdd = {
          verseName,
          text
        };
        toAdd.verses.push(verseToAdd)
      }
      bookChapters.push(toAdd);
    }
  }
  // TODO Is this the point we index?
  return { books, bookChapters };
}

const getChapters = async () => {
  if (!thebookchapters) {
    const everything = await readChapters();
    thebookchapters = everything.bookChapters;
    thebooks = everything.books;
    // Remove unnecessary memory
    thejson = undefined;
    // thebooks = undefined;
  }
  return { thebooks, thebookchapters };
}

const getBooks = async () => {
  if (!thebooks) {
    thebooks = await readBooks();
  }
  return thebooks;
}

const getBook = async (bookName) => {
  const { thebooks } = await getChapters();
  const matched = thebooks.filter((book) => book.bookName === bookName);
  if (matched.length === 0) {
    throw new Error(`Book ${bookName} not found`);
  }
  return matched[0];
}

const cleanUpNextPrevLink = ({ bookName, chapterName, unique }) => {
  return {
    name: `${bookName} ${chapterName}`,
    link: `/read/${unique}`
  }
}

const getChapter = async (bookChapter) => {
  const { thebookchapters } = await getChapters();
  let foundIndex;
  const result = thebookchapters.find((value, index) => {
    foundIndex = index;
    return bookChapter === value.unique;
  });
  // prev and next
  const copy = {...result};
  copy.prev = (foundIndex > 0)
    ? cleanUpNextPrevLink(thebookchapters[foundIndex - 1])
    : { name: 'Did you even read the first verse?' };
  copy.next = (foundIndex < thebookchapters.length - 1)
    ? cleanUpNextPrevLink(thebookchapters[foundIndex + 1])
    : { name: 'God didn\'t add anything else, dude.' };
  return copy;
}

module.exports = { getChapters, getBook, getChapter }
