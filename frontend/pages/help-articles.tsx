import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = ( {allArticles} ) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Help Articles List
        </h1>

        <p className={styles.description}>
          todo list here: 
        </p>

        {/* <h2>JSONify- {JSON.stringify(allArticles)} </h2> */}

        <ul>
            {allArticles.map((article) => (
                <li>{article.title} - {article.body} </li>
            ))}           
        </ul>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

export async function getStaticProps() {
    // const allPosts = (await getAllPostsForHome(preview)) || []
    const allArticles = [{title: "example", body: "bodyexample", key: "title"}]
    return {
      props: { allArticles },
    }
}