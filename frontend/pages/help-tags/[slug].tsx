import { useRouter } from 'next/router'
import { fetchHelpArticleById, fetchHelpArticles, StrapiResponseBody, Article, fetchHelpArticleBySlug, HelpTags, fetchHelpArticlesByTag } from '../../lib/api'

import Link from 'next/link'
import ArticleTable from '../../components/article-table'

export default function TagPage({ tag, params, articles }: { tag: StrapiResponseBody<HelpTags> }) {
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

                    <h1>Tags: {params.slug}</h1>
{/* 
                    Tag Page: {JSON.stringify(params)}

                    <hr />

                    Articles: {JSON.stringify(articles)}

                    <hr /> */}

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
    // const allArticles = await fetchHelpArticles()
    return {
        // paths: allArticles?.map((article) => `/help-article/${article.attributes.Slug}`) || [],
        paths: ['/help-tags/frequently-asked'],
        fallback: true,
    }
}
