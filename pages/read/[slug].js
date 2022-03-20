import { useRouter } from 'next/router';
import ErrorPage from 'next/error'

export default function Chapter({ data = {} }) {

  const router = useRouter();

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }


}