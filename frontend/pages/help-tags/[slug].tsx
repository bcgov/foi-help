import { useRouter } from 'next/router'
import { fetchHelpArticlesByTag, fetchHelpTags } from '../../lib/api'

import Head from 'next/head'
import Link from 'next/link'
import ArticleTable from '../../components/article-table'
import Layout from '../../components/layout'

export default function TagPage({ tag, params, articles }: any ) {
    const router = useRouter()
    return (
        // <Layout preview={preview}>
        <Layout>
            <div className="container">
                {router.isFallback ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        <Head>
                            <title>{params.slug} | FOI Help</title>
                        </Head>
                        <Link href="/help-articles/"><a className="back-link"> &larr; Back to Help Articles</a></Link>
                        <hr />
                        <h1>View all help articles with tag: {params.slug}</h1>
                        <ArticleTable articles={articles} />
                    </>
                )}
            </div>
        </Layout>
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
