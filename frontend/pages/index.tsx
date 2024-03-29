import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Search from '../components/search'
import { signIn, signOut, useSession } from "next-auth/react"
import Layout from "../components/layout"

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <Layout>
      <h1 className={styles.title}>
        FOI Help
      </h1>

      <p className={styles.description}>
        Get started by viewing{' '}
        {/* <code className={styles.code}>pages/index.tsx</code> */}
        <Link href='/help-articles/'><a>Help Articles</a></Link>
      </p>
    </Layout>
    // <div className={styles.container}>
    //   <Head>
    //     <title>FOI Help</title>
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <main className={styles.main + " container"}>
    //     <h1 className={styles.title}>
    //       FOI Help
    //     </h1>

    //     <p className={styles.description}>
    //       Get started by viewing{' '}
    //       {/* <code className={styles.code}>pages/index.tsx</code> */}
    //       <Link href='/help-articles/'><a>Help Articles</a></Link>
    //     </p>


    //     {/* <div className={styles.grid}>
    //       <a href="https://nextjs.org/docs" className={styles.card}>
    //         <h2>Documentation &rarr;</h2>
    //         <p>Find in-depth information about Next.js features and API.</p>
    //       </a>

    //       <a href="https://nextjs.org/learn" className={styles.card}>
    //         <h2>Learn &rarr;</h2>
    //         <p>Learn about Next.js in an interactive course with quizzes!</p>
    //       </a>

    //       <a
    //         href="https://github.com/vercel/next.js/tree/canary/examples"
    //         className={styles.card}
    //       >
    //         <h2>Examples &rarr;</h2>
    //         <p>Discover and deploy boilerplate example Next.js projects.</p>
    //       </a>

    //       <a
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //         className={styles.card}
    //       >
    //         <h2>Deploy &rarr;</h2>
    //         <p>
    //           Instantly deploy your Next.js site to a public URL with Vercel.
    //         </p>
    //       </a>
    //     </div> */}
    //   </main>

    // </div>
  )
}

export default Home

