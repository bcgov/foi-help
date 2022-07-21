import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { fetchHelpArticles, StrapiResponseBody, Article, } from '../lib/api'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import markdownToHtml from '../lib/markdownToHTML'
import Search from '../components/search'
import HelpTag from '../components/tag'
import ArticleTable from '../components/article-table'
import { signIn, signOut, useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"

const Home: NextPage = ( {allArticles, moreArticles }: any ) => {
  const { data: session, status } = useSession()
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

  return (
    // <div className={styles.container}>
    <Layout>
      <h1 className={styles.title}>
        Help Articles List
      </h1>


      <p className={styles.description}>
        Get started by searching or browsing from help articles below
      </p>

      <Search searchData={allArticles} />

      <hr />
      <ArticleTable articles={allArticles} />
    </Layout>

//     <div className="container">
//       <Head>
//         <title>Help Articles | FOI Help</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main + " container"}>
//         <h1 className={styles.title}>
//           Help Articles List
//         </h1>


//         <p className={styles.description}>
//           Get started by searching or browsing from help articles below
//         </p>

//         <Search searchData={allArticles} />



//         {/* <h2>JSONify- {JSON.stringify(allArticles)} </h2> */}
// {/* 
//         <ul>
//             {allArticles.map((article: StrapiResponseBody<Article> ) => (
//                 <li key={article.id}>
//                     <Link href={"/help-article/" + article.id }>
//                         <a>{article.attributes.Title}</a>
//                     </Link>
//                 </li>
//             ))}           
//         </ul> */}

//         <hr />
//         <ArticleTable articles={allArticles} />

//         {/* FIXME: If any work is done on below, break out into own component like ArticleTable */}
//         {/* <div className={styles.grid}>
//         {moreArticles.map((article: StrapiResponseBody<Article> ) => (
//               <Link href={"/help-article/" + article.attributes.Slug }  key={article.id} >
//                 <a className={styles.card}>
//                   <h2>#{article.id}: {article.attributes.Title} &rarr;</h2>
//                   <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: (article as ArticleWithSnippet).snippet }}></div>
//                 </a>
//               </Link>
//             ))}  
          
//         </div> */}

//       </main>
//     </div>
  )
}

export default Home

export async function getStaticProps() {
    // Sort by ID
    const articles = (await fetchHelpArticles()).sort((a,b) => a.id - b.id)

    // Include snippets for excerpts.
    const allArticles = await Promise.all(articles.map(async article => {
      // const snippet = await getArticleSnippet(article);
      const snippet = article.attributes.Body.substring(0, 100);
      (article as ArticleWithSnippet).snippet = snippet;
      return article
    }))

    // Temporary, instead of pagination, just show 12 items.
    const moreArticles = allArticles.reverse().slice(0, 12);

    // console.log(allArticles)

    return {
      props: { allArticles, moreArticles },
    }
}


// Rendering as HTML was too distracting, eg bold.
async function getArticleSnippet(article: StrapiResponseBody<Article>): Promise<string> {
  const content = await markdownToHtml(article.attributes.Body.substring(0, 100))
  return content;
}


interface ArticleWithSnippet extends StrapiResponseBody<Article> {
  snippet: string;
}
