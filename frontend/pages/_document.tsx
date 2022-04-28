import { Html, Head, Main, NextScript } from 'next/document'
// import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>

        <div className="wrap">
            


      <header className="header">
        <div class="container">
            <a href="http://www2.gov.bc.ca/" tabindex="-1">
                {/* <img class="header-logo" tabindex="-1" alt="B.C. Government Logo" src="/assets/images/gov3_bc_logo.png"> */}
                <img className="headerLogo" tabindex="-1" alt="B.C. Government Logo" src="/images/gov3_bc_logo.png" />
            </a>
            <span className="headerTitle" role="banner">
                <Link href='/'><a className="nolink">FOI Help</a></Link>
            </span>
        </div>
      </header>



        <Main />
        <NextScript />

        </div>
        <div className="pad"></div>

        <footer class="footer">
            <nav class="navbar navbar-expand-md navbar-dark">
                <div class="container">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link" href="http://www2.gov.bc.ca/gov/content/home/disclaimer" target="_blank">Disclaimer</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="http://www2.gov.bc.ca/gov/content/home/privacy" target="_blank">Privacy</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="http://www2.gov.bc.ca/gov/content/home/accessibility" target="_blank"
                        >Accessibility</a
                    >
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="http://www2.gov.bc.ca/gov/content/home/copyright" target="_blank">Copyright</a>
                    </li>
                </ul>
                </div>
            </nav>
        </footer>



      </body>
    </Html>
  )
}