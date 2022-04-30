import { Media, StrapiResponseBody } from '../lib/api'
import styles from '../styles/media.module.css'

export default function HelpMedia({ mediaData }: Media) {

    console.log('helpMedia', { mediaData, conditional: !mediaData })

    // TODO ONLY TEMPORARY FOR DEMO
    function generateStrapiVideoLink(data){
        return 'http://localhost:1337' + data.url;
    }
    //   const hasMedia = mediaData.


    if (!mediaData) {
        return (
            <div className={styles.missingMedia}>
                <code>No media in help-media</code>
            </div>
        )
    }



    return (
        <div className={styles.media}>
            <video controls className={styles.player} src={generateStrapiVideoLink(mediaData)}></video>
            {/* Media: <code>{JSON.stringify(mediaData)}</code> */}
        </div>
    )
}