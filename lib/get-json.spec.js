const getJson = require('./get-json');

test('parses chapters and books correctly', async () => {
  const { thebooks, thebookchapters } = await getJson.getChapters();
  expect(thebookchapters).toBeTruthy();
  expect(thebookchapters.length).toBe(1189);
  expect(thebooks).toBeTruthy();
  expect(thebooks.length).toBe(66);
});

test('gets one chapter', async () => {
  const result = await getJson.getChapter('Exodus-24');
  expect(result).toBeTruthy();
  expect(result.bookName).toBe('Exodus');
  expect(result.chapterName).toBe('24');
  expect(result.verses.length).toBe(18);
});
