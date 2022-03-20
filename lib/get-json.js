const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

const filepath = path.resolve(__dirname, 'esv.xml');
let thejson;
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
    console.err(err);
  }
}

// Only for use within readChapters
const bible = async () => {
  if (!thejson) {
    thejson = await readIt();
  }
  return thejson;
}

// Only for use within getChapters
const readChapters = async () => {
  const allOfIt = await bible();
  const books = allOfIt.bible.book;
  // One HTML page per book / chapter (over 1k entries)
  const bookChapters = [];
  for (const book of books) {
    const bookName = book.$.name;
    const chapters = book.chapter;
    for (const chapter of chapters) {
      const chapterName = chapter.$.name;
      const verses = chapter.verse;

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
  return bookChapters;
}

const getChapters = async () => {
  if (!thebookchapters) {
    thebookchapters = await readChapters();
    // Remove unnecessary memory
    thejson = undefined;
  }
  return thebookchapters;
}

const getChapter = async (bookChapter) => {
  const allBookChapters = await getChapters();
  const result = allBookChapters.find((value, index) => {
    return bookChapter === value.unique;
  });
  return result;
}

module.exports = { getChapters, getChapter }
