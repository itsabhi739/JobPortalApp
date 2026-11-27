import { Navigate, useSearchParams } from 'react-router-dom'

// /search?q=react -> /jobs?keyword=react (single canonical search page)
const Search = () => {
  const [params] = useSearchParams()
  const q = params.get('q') || params.get('keyword') || ''
  return <Navigate to={q ? `/jobs?keyword=${encodeURIComponent(q)}` : '/jobs'} replace />
}

export default Search
