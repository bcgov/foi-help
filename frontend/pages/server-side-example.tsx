import { useSession, getSession } from "next-auth/react"
import LoginButton from '../components/login-btn'
// import { LoginButton } from '../components/login-button'

// https://stackoverflow.com/questions/65365978/next-js-protect-routes-which-use-static-site-generation
// Potentially use above SO post.

// Also potentially use the "custom server" approach, with Express as frontend
// https://nextjs.org/docs/advanced-features/custom-server

export default function Page() {
  const { data: session } = useSession()

  //  Below causes hydration issue
//   if (typeof window === "undefined") return null

  if (session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
      </>
    )
  }
  return (
    <>
        <p>Access Denied: {JSON.stringify(session)}</p>
        <LoginButton />
    </> 
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}