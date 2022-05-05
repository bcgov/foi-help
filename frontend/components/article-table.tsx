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
            Article list here
            { articles.map(article => {
                return <ArticleRow article={article} key={article.id} />
            })}
            { JSON.stringify(articles) }
            {/* <Link>
                <a className={styles.link}>{ name }</a>
            </Link> */}
        </div>
    )
}


function ArticleRow({ article }: {article: StrapiResponseBody<Article>}) {

    console.log('articleRow article', article )


    return (
        <div className={styles.row}>
            <div className={styles.icon}></div>
            <div>
                {article.attributes.Title}
            </div>
        </div>
    )

}