import { Media, StrapiResponseBody } from '../lib/api'
import styles from '../styles/media.module.css'

export default function HelpMedia({ mediaData }) {

    function isMimeType(type): boolean {
        return mediaData.attributes.mime.includes(type)
    }

    function generateStrapiVideoLink(data: Media){
        return data.url
    }

    if (!mediaData || !isMimeType('video')) {
        return (
            <div className={styles.missingMedia}>
                <code>No video for article</code>
            </div>
        )
    }

   if (isMimeType('video')) {
       return (
           <div className={styles.media}>
               <video controls className={styles.player} src={generateStrapiVideoLink(mediaData.attributes)}></video>
           </div>
       )
   } 

}