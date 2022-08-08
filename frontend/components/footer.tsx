import Link from "next/link"
import styles from "./footer.module.css"
import packageJSON from "../package.json"

export default function Footer() {
  return (
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
              <a className="nav-link" href="http://www2.gov.bc.ca/gov/content/home/accessibility" target="_blank" rel="noreferrer">Accessibility</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://www2.gov.bc.ca/gov/content/home/copyright" target="_blank" rel="noreferrer">Copyright</a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  )
}
