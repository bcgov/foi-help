import { Article, StrapiResponseBody } from '../lib/api'

import Link from 'next/link'
import styles from './article-table.module.css'

import { MdOutlineVideoCameraBack } from "react-icons/md";


// export default function ArticleTable({ articles }: {articles: StrapiResponseBody<Article>[]}) {
export default function ArticleTable({ articles }: {articles: any}) {

    if (!articles) {
        return (
            <div>
                No articles!
            </div>
        )
    }

    return (
        <div className={styles.table}>
            { articles.map(article => {
                return <ArticleRow article={article} key={article.id} />
            })}
        </div>
    )
}


function ArticleRow({ article }: {article: StrapiResponseBody<Article>}) {

    return (
        <div className={styles.row}>
            <div className={styles.icon}>
                <MdOutlineVideoCameraBack />
            </div>
            <div className={styles.rowBody}>
                <Link href={'/help-article/' + article.attributes.Slug}>
                    <a className='link'>
                        <h2 className={styles.rowTitle + ' h2'}>{article.attributes.Title} &rarr;</h2>
                    </a>
                </Link>
                <p className={styles.excerpt}>{ createSnippet(article.attributes.Body) }</p>
            </div>
        </div>
    )

}


function createSnippet(input: string): string{
    // We also do CSS truncation/elipses with excerpt class
    // But this is a fallback.
    // return input.substring(0, 500);
    return input.substring(0, 300);
}