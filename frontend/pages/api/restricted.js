import { unstable_getServerSession } from "next-auth/next"
// import { authOptions } from "./api/auth/[...nextauth]"
import { authOptions } from "./auth/[...nextauth]"

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    })
  }
}