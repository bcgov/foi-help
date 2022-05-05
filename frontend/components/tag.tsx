// import { Tag, StrapiResponseBody } from '../lib/api'

import Link from 'next/link'
import styles from './tag.module.css'

export default function HelpTag({ name }: {name: string }) {

    if (!name) {
        return (
            <div>
                <code>NO NAME FOR TAG</code>
            </div>
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