const getJson = require('./get-json');

test('gets chapters', async () => {
  const { thebookchapters } = await getJson.getChapters();
  expect(thebookchapters).toBeTruthy();
  expect(thebookchapters.length).toBe(1189);
});

test('gets one chapter', async () => {
  const result = await getJson.getChapter('Exodus-24');
  expect(result).toBeTruthy();
  expect(result.bookName).toBe('Exodus');
  expect(result.chapterName).toBe('24');
  expect(result.verses.length).toBe(18);
});

test('gets books', async () => {
  const { thebooks } = await getJson.getChapters();
  expect(thebooks).toBeTruthy();
  expect(thebooks.length).toBe(66);
});
