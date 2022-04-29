import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './search.module.css'
import { Article, StrapiResponseBody } from '../lib/api'

export default function Search( {searchData}: {searchData: StrapiResponseBody<Article>[]} ) {

  const searchRef = useRef(null as any)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

//   const searchEndpoint = (query) => `/api/search?q=${query}`

//   console.log('Search: Props', { searchData })

  const onChange = useCallback((event) => {
    const query: string = event.target.value;
    setQuery(query)
    if (query.length) {
        // TODO - Change this fetch to query from datasource in lib.
        // fetchHelpArticles() then search on both title and body
        // but want to cache everything locally, how?

        let filtered = searchData.filter(article => {
            if (article.attributes.Title.toLowerCase().includes(query.toLowerCase())) {
                return true
            }
            if (article.attributes.Body.toLowerCase().includes(query.toLowerCase())) {
                return true
            }
            return false;
        }).map(article => {
            return {id: article.id, title: `#${article.id}: ${article.attributes.Title}`}
        })
        // console.log('filtered', { filtered })
        setResults((filtered as any));
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div
      className={styles.container}
      ref={searchRef}
    >
      <input
        className={styles.search}
        onChange={onChange}
        onFocus={onFocus}
        placeholder='Search posts'
        type='text'
        value={query}
      />
      { active && results.length > 0 && (
        <ul className={styles.results}>
          {results.map(({ id, title }) => (
            <li className={styles.result} key={id}>
              <Link href="/help-article/[id]" as={`/help-article/${id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) }
    </div>
  )
}