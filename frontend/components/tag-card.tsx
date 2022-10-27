
import Link from 'next/link'
import styles from './tag.module.css'

export function TagCard({ name, description }: { name: string }) {

    if (!name) {
        return (
            <div>
                <code>NO NAME FOR TAG</code>
            </div>
        )
    }


    return (
        // <Link href={'/help-tags/' + encodeURI(name)}>
        //     <a className={styles.tag}>
        //     <span>{name}</span>
        //     </a>
        // </Link>
        <Link href={'/help-tags/' + encodeURI(name)}>
            <div className={styles.card}>
                <div className={styles.card_title}>
                    { name }
                        {/* <a><span>{name}</span></a> */}
                </div>
                <div className={styles.card_body}>
                    { description || 'Missing description' }
                </div>
            </div>
        </Link>
    )
}