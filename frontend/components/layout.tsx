import Header from "./header"
import Footer from "./footer"
import type { ReactChildren } from "react"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="wrap">
        <Header />
        <div className="container">
          <main>{children}</main>
        </div>
      </div>
      <div className="pad"></div>
      <Footer />
    </>
  )
}
