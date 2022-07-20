/* eslint-disable @next/next/no-img-element */
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
        <div className="container">
            <a href="http://www2.gov.bc.ca/" tabIndex={-1}>
                {/* <img className="header-logo" tabindex="-1" alt="B.C. Government Logo" src="/assets/images/gov3_bc_logo.png"> */}
                <img className="headerLogo" tabIndex={-1} alt="B.C. Government Logo" src="/images/gov3_bc_logo.png" />
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

        <footer className="footer">
            <nav className="navbar navbar-expand-md navbar-dark">
                <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link" href="http://www2.gov.bc.ca/gov/content/home/disclaimer" target="_blank" rel="noreferrer">Disclaimer</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="http://www2.gov.bc.ca/gov/content/home/privacy" target="_blank" rel="noreferrer">Privacy</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="http://www2.gov.bc.ca/gov/content/home/accessibility" target="_blank" rel="noreferrer"
                        >Accessibility</a
                    >
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="http://www2.gov.bc.ca/gov/content/home/copyright" target="_blank" rel="noreferrer">Copyright</a>
                    </li>
                </ul>
                </div>
            </nav>
        </footer>



      </body>
    </Html>
  )
}