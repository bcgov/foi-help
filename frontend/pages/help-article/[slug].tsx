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
import HelpTag from '../../components/tag'
import markdownToHtml from '../../lib/markdownToHTML'
import YoutubeEmbed from '../../components/youtube-embed'
import Layout from "../../components/layout"

export default function Post({ article, preview, content, hasMedia, helpTags }: { article: StrapiResponseBody<Article>, preview: any, content: any, hasMedia: boolean, helpTags: StrapiResponseBody<HelpTags>[] }) {
    const router = useRouter()
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
                        {article.attributes.YouTube 
                            ? <meta property="og:video" content={article.attributes.YouTube} />
                            : <></>
                        }
                    </Head>
                    <Link href="/help-articles/"><a className="back-link"> &larr; Back to Help Articles</a></Link>


                    {/* {JSON.stringify(helpTags)} */}
                    <hr />


            

                    <article>
                        <div className='article-metadata'>
                            <h1>{article.attributes.Title} </h1>
                            {helpTags.map(tag => {
                            return <HelpTag key={tag.id} name={tag.attributes.Name}></HelpTag> 
                            })}
                        </div>

                       
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
    // console.log({article, helptags: article.attributes.help_tags})

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
