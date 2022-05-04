import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { fetchHelpArticleById, fetchHelpArticles, StrapiResponseBody, Article, fetchHelpArticleBySlug, HelpTags, fetchHelpArticlesByTag } from '../../lib/api'

import Link from 'next/link'
import HelpMedia from '../../components/media'
import HelpTag from '../../components/tag'
import markdownToHtml from '../../lib/markdownToHTML'

export default function TagPage({ tag, params, articles }: { tag: StrapiResponseBody<HelpTags> }) {
    const router = useRouter()
    // if (!router.isFallback) {
    //     return <ErrorPage statusCode={404} />
    // }
    return (
        // <Layout preview={preview}>
        <div className="container">
            {router.isFallback ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <Link href="/help-articles/"><a className="back-link"> &larr; Back to Help Articles</a></Link>
                    <hr />

                    Tag Page: {JSON.stringify(params)}

                    <hr />

                    Articles: {JSON.stringify(articles)}

                    


            

                </>
            )}
        </div>
    )
}

export async function getStaticProps({ params, preview = null }) {
    // const article = await fetchHelpArticleById(params.slug)
    // const article = await fetchHelpArticleBySlug(params.slug)
    // const content = await markdownToHtml(article.attributes.Body)
    // const hasMedia = article.attributes.Media.data
    // const helpTags = article.attributes.help_tags?.data
    // console.log({article})
    // console.log( JSON.stringify(helpTags) )

    const articles = await fetchHelpArticlesByTag(params.slug)

    // TODO: Get all articles by tag.
    // Show list
    console.log('hlp tags params', params, { articles })

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
