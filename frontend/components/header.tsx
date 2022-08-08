import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import 'bootstrap/dist/css/bootstrap.css'

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header className="header">
      <div className="container">
        <a href="http://www2.gov.bc.ca/" tabIndex={-1}>
          {/* <img className="header-logo" tabindex="-1" alt="B.C. Government Logo" src="/assets/images/gov3_bc_logo.png"> */}
          <img className="headerLogo" tabIndex={-1} alt="B.C. Government Logo" src="/images/gov3_bc_logo.png" />
        </a>
        <span className="headerTitle" role="banner">
          <Link href='/'><a className="nolink">FOI Help</a></Link>
        </span>
        <span
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <a
              href={`/api/auth/signin/keycloak`}
              className={styles.buttonPrimary}
              onClick={(e) => {
                e.preventDefault()
                signIn('keycloak')
              }}
            >
              <button type="button" className="btn btn-primary btn-sign">
              Sign in
              </button>
            </a>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                <button type="button" className="btn btn-primary btn-sign">
                Sign out
                </button>
              </a>
            </>
          )}
        </span>
      </div>
    </header>
  )
}
