// Can we static generation with a dynamic slug?
// Or how do we staticly generate all these pages by iterating over an api?
// copied from https://raw.githubusercontent.com/vercel/next.js/canary/examples/cms-strapi/pages/posts/%5Bslug%5D.js

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
// import Container from '@/components/container'
// import PostBody from '@/components/post-body'
// import MoreStories from '@/components/more-stories'
// import Header from '@/components/header'
// import PostHeader from '@/components/post-header'
// import SectionSeparator from '@/components/section-separator'
// import Layout from '@/components/layout'
// import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
// import PostTitle from '@/components/post-title'
import Head from 'next/head'
import { fetchHelpArticleById, fetchHelpArticles, StrapiResponseBody, Article, fetchHelpArticleBySlug } from '../../lib/api'
// import { CMS_NAME } from '@/lib/constants'
// import markdownToHtml from '@/lib/markdownToHtml'

import Link from 'next/link'
import markdownToHtml from '../../lib/markdownToHTML'

export default function Post({ article, preview, content, hasMedia }: { article: StrapiResponseBody<Article>, preview: any, content: any, hasMedia: boolean }) {
    const router = useRouter()
    if (!router.isFallback && !article) {
        return <ErrorPage statusCode={404} />
    }
    return (
        // <Layout preview={preview}>
        <div className="container">
            {/* <Container> */}
            {/* <Header /> */}
            {router.isFallback ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {/* <article>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
                    <Link href="/help-articles/"><a>Back to Help Articles</a></Link>
                    <article>
                        <h1>{article.attributes.Title} </h1>
                        {hasMedia 
                            ? <p>Has media: <code>{JSON.stringify( article.attributes.Media ) }</code> </p>
                            : <p><code>No media</code></p>}
                        <div dangerouslySetInnerHTML={{ __html: content }} ></div>
                    </article>
                </>
            )}
            {/* </Container> */}
            {/* </Layout> */}
        </div>
    )
}

export async function getStaticProps({ params, preview = null }) {
    // console.log('params', params)
    // const article = await fetchHelpArticleById(params.slug)
    // const article = await fetchHelpArticleById(1)
    const article = await fetchHelpArticleBySlug(params.slug)

    console.log( {article: JSON.stringify(article), input: params.slug})

    // console.log({ article, attributes: article.attributes, params })
    const content = await markdownToHtml(article.attributes.Body)
    const hasMedia = article.attributes.Media.data

    // console.log({article})

    return {
        props: {
            preview,
            article,
            content,
            hasMedia
        },
    }
}

export async function getStaticPaths() {
    const allArticles = await fetchHelpArticles()
    return {
        paths: allArticles?.map((article) => `/help-article/${article.attributes.Slug}`) || [],
        fallback: true,
    }
}
