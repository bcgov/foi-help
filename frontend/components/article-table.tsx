import { Article, StrapiResponseBody } from '../lib/api'

import Link from 'next/link'
import styles from './article-table.module.css'

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
            {/* { JSON.stringify(articles) } */}
            {/* <Link>
                <a className={styles.link}>{ name }</a>
            </Link> */}
        </div>
    )
}


function ArticleRow({ article }: {article: StrapiResponseBody<Article>}) {

    return (
        <div className={styles.row}>
            <div className={styles.icon}></div>
            <div className={styles.rowBody}>
                <Link href={'/help-article/' + article.attributes.Slug}>
                    <a>
                        {article.attributes.Title}
                    </a>
                </Link>
            </div>
        </div>
    )

}