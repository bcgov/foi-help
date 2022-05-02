import { Media, StrapiResponseBody } from '../lib/api'
import styles from '../styles/media.module.css'

export default function HelpMedia({ mediaData }) {

    // TODO ONLY TEMPORARY FOR DEMO
    // STRAPI NOT VIABLE FOR HOSTING ON OPENSHIFT
    function generateStrapiVideoLink(data: Media){
        // TODO - FIX THIS FOR OPENSHIFT.
        // return process.env.STRAPI_API_URL + data.url; // THIS FAILS, as STRAPI_API_URL is not accessible client-side.  Hardcode for demo
        // return 'https://localhost:1337' + data.url;
        // return 'http://localhost:1337/uploads/example_bunny_56f1881a8f.mp4'
        return 'http://localhost:1337' + data.url;
    }

    if (!mediaData) {
        return (
            <div className={styles.missingMedia}>
                <code>No media for article</code>
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