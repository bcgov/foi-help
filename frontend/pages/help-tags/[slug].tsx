import { useRouter } from 'next/router'
import { fetchHelpArticleById, fetchHelpArticles, StrapiResponseBody, Article, fetchHelpArticleBySlug, HelpTags, fetchHelpArticlesByTag, fetchHelpTags } from '../../lib/api'

import Link from 'next/link'
import ArticleTable from '../../components/article-table'

export default function TagPage({ tag, params, articles }: any ) {
    const router = useRouter()
    return (
        // <Layout preview={preview}>
        <div className="container">
            {router.isFallback ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <Link href="/help-articles/"><a className="back-link"> &larr; Back to Help Articles</a></Link>
                    <hr />
                    <h1>View all help articles with tag: {params.slug}</h1>
                    <ArticleTable articles={articles} />
                </>
            )}
        </div>
    )
}

export async function getStaticProps({ params, preview = null }) {
    // console.log('hlp tags params', params)
    const articles = await fetchHelpArticlesByTag(params.slug)
    // console.log('hlp tags params', params, { articles: articles })

    return {
        props: {
            preview,
            params,
            articles
        },
    }
}

export async function getStaticPaths() {
    const tags = await fetchHelpTags();
    return {
        paths: tags?.map(tag => `/help-tags/${tag.attributes.Name}`) || [],
        fallback: true,
    }
}
