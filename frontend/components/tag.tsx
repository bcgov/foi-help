// import { Tag, StrapiResponseBody } from '../lib/api'

import Link from 'next/link'
import styles from './tag.module.css'

export default function HelpTags({ helpTags }: any) {



    // TODO, add "/" before all but final
    return (
        <>
            {helpTags.map((tag, index) => {
                const notFinal = index+1 < helpTags.length;

                if (!notFinal){
                    return <><HelpTag key={tag.id} name={tag.attributes.Name}></HelpTag></>
                }

                return <><HelpTag key={tag.id} name={tag.attributes.Name}></HelpTag>&nbsp;&nbsp;&nbsp;/</>
                // return <><HelpTag key={tag.id} name={tag.attributes.Name}></HelpTag>/</>

                // return notFinal
                //     ? (<HelpTag key={tag.id} name={tag.attributes.Name}></HelpTag> )
                //     : <HelpTag key={tag.id} name={tag.attributes.Name}></HelpTag>
                // // if (notFinal){

                // }
                // return <HelpTag key={tag.id} name={tag.attributes.Name}></HelpTag>
            })}
        </>
    )
}


export function HelpTag({ name, description }: { name: string }) {

    if (!name) {
        return (
            <div>
                <code>NO NAME FOR TAG</code>
            </div>
        )
    }


    return (
        // <span className={styles.tag}>
        //     <Link href={'/help-tags/' + encodeURI(name)} className={styles.tag}>
        //         <a className={styles.link}>{name}</a>
        //     </Link>
        // </span>
        
            <Link href={'/help-tags/' + encodeURI(name)}>
                <a className={styles.tag}>
                <span>{name}</span>
                </a>
            </Link>
         
    )
}