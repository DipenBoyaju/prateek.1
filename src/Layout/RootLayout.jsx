import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import ScrollToTop from "./ScrollToTop"

const RootLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
export default RootLayout