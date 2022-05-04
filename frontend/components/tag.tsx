// import { Tag, StrapiResponseBody } from '../lib/api'

import Link from 'next/link'
import styles from './tag.module.css'

export default function HelpTag({ name, embed=false }: {name: string, embed: boolean}) {

    if (!name) {
        return (
            <div>
                <code>NO NAME FOR TAG</code>
            </div>
        )
    }

    if (embed) {
       return (
        <span className={styles.tag}>
            <span className={styles.link}>{ name }</span>
        </span>
       )
    }



    return (
        <span className={styles.tag}>
            <Link href={'/help-tags/' + encodeURI(name)}>
                <a className={styles.link}>{ name }</a>
            </Link>
        </span>
    )
}