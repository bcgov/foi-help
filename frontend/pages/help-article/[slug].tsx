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
// import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/ HelpTags
// import PostTitle from '@/components/post-title'
import Head from 'next/head'
import { fetchHelpArticleById, fetchHelpArticles, StrapiResponseBody, Article, fetchHelpArticleBySlug, HelpTags } from '../../lib/api'
// import { CMS_NAME } from '@/lib/constants'
// import markdownToHtml from '@/lib/markdownToHtml'

import Link from 'next/link'
import HelpMedia from '../../components/media'
import markdownToHtml from '../../lib/markdownToHTML'
import YoutubeEmbed from '../../components/youtube-embed'
import { signIn, signOut, useSession } from "next-auth/react"
import Layout from "../../components/layout"
import AccessDenied from "../../components/access-denied"
import HelpTagsComponent from '../../components/tag'

export default function Post({ article, preview, content, hasMedia, helpTags }: { article: StrapiResponseBody<Article>, preview: any, content: any, hasMedia: boolean, helpTags: StrapiResponseBody<HelpTags>[] }) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const loading = status === "loading"
  
    // When rendering client side don't display anything until loading is complete
    if (loading) return null
  
    // If no session exists, display access denied message
    if (!session) {
      return (
        <Layout>
          <AccessDenied />
        </Layout>
      )
    }

    if (!router.isFallback && !article) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <Layout>
        {/* // <Layout preview={preview}> */}
        <div className="container">
            {/* <Container> */}
            {/* <Header /> */}
            {router.isFallback ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <Head>
                        <title>
                        {article.attributes.Title} | FOI Help
                        </title>

                        {/* Set meta tag if youtube link is present. */}
                        {/* TODO - Update with S3 info once integration done. */}
                        {article.attributes.YouTube 
                            ? <meta property="og:video" content={article.attributes.YouTube} />
                            : <></>
                        }
                    </Head>
                    <Link href="/help-articles/"><a className="back-link"> &larr; Back to Help Articles</a></Link>

                    <hr />

                    <article>
                        <div className='article-metadata'>
                            <h1>{article.attributes.Title} </h1>
                            <HelpTagsComponent helpTags={helpTags} />
                        </div>

                        <HelpMedia mediaData={article.attributes.Media.data} />
                       
                        <YoutubeEmbed url={article.attributes.YouTube} 
                            title={article.attributes.Title} />
                        {/* <p>HelpTags: {JSON.stringify(helpTags)} </p> */}
                        <div dangerouslySetInnerHTML={{ __html: content }} ></div>

                    </article>
                </>
            )}
            {/* </Container> */}
            {/* </Layout> */}
        </div>
        </Layout>
    )
}

export async function getStaticProps({ params, preview = null }) {
    // const article = await fetchHelpArticleById(params.slug)
    const article = await fetchHelpArticleBySlug(params.slug)
    const content = await markdownToHtml(article.attributes.Body)
    const hasMedia = article.attributes.Media.data
    const helpTags = article.attributes.help_tags?.data
    console.log({article, helptags: article.attributes.help_tags})

    return {
        props: {
            preview,
            article,
            content,
            hasMedia,
            helpTags
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
