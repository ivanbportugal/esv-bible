import localForage from 'localforage'

const LAST_VISITED_KEY = 'LAST_VISITED_KEY'

const getLastVisited = async () => {
  if (typeof window !== 'undefined') {
    await localForage.ready();
    return await localForage.getItem(LAST_VISITED_KEY) as string
  }
}

const setLastVisited = async (url: string) => {
  if (typeof window !== 'undefined') {
    await localForage.ready();
    return await localForage.setItem(LAST_VISITED_KEY, url)
  }
}

export { getLastVisited, setLastVisited }
