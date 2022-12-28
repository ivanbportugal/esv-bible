const { Document } = require('flexsearch');

const indexText = (thebookchapters: any) => {
  console.log('Begin reading text...')
  const index = new (Document as any)({
    document: {
      id: 'id',
      index: ['content']
    }
  });
  const searchEngineLookup  = {};
  // add each to index
  const totalCount = thebookchapters.length;
  for (const bookChapter of thebookchapters) {
    const unique = bookChapter.unique;
    
    for (const { verseName, text } of bookChapter.verses) {
      const uniqueWithVerse = `${unique}:${verseName}`;
      const textToIndex = `${bookChapter.bookName} ${bookChapter.chapterName}:${verseName} ${text}`;
      index.add({
        id: uniqueWithVerse,
        content: textToIndex
      });
      searchEngineLookup[uniqueWithVerse] = text;
    }
  }
  console.log(`Finished indexing all ${totalCount} chapters.`);
  return {
    index,
    searchEngineLookup
  };
}

export { indexText }
