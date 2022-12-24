const getJson = require('./get-json');

test('gets chapters', async () => {
  const results = await getJson.getChapters();
  expect(results).toBeTruthy();
  expect(results.length).toBe(1189);
});

test('gets one chapter', async () => {
  const result = await getJson.getChapter('Exodus-24');
  expect(result).toBeTruthy();
  expect(result.bookName).toBe('Exodus');
  expect(result.chapterName).toBe('24');
  expect(result.verses.length).toBe(18);
});

test('gets books', async () => {
  const results = await getJson.getBooks();
  expect(results).toBeTruthy();
  expect(results.length).toBe(66);
});
