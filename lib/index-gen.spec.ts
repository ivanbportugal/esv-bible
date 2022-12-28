import getJson from './get-json';
import { indexText } from './index-gen';

test('Indexing works', async () => {
  const { thebookchapters } = await getJson.getChapters();
  const { index, searchEngineLookup } = indexText(thebookchapters);
  expect(index).toBeTruthy();
  expect(searchEngineLookup).toBeTruthy();
});
