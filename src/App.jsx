import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./Layout/RootLayout"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Research from "./pages/Research/Research"
import Team from "./pages/Team/Team"
import Project from "./pages/Project/Project"
import Contact from "./pages/Contact/Contact"
import Blog from "./pages/Blog/Blog"
import Events from "./pages/Events/Events"
import Newsletter from "./pages/NewsLetter/Newsletter"
import News from "./pages/News/News"
import SignLanguage from "./pages/SignLanguage/SignLanguage"

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/', element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/research', element: <Research /> },
        { path: '/team', element: <Team /> },
        { path: '/project', element: <Project /> },
        { path: '/contact', element: <Contact /> },
        { path: '/blog', element: <Blog /> },
        { path: '/events', element: <Events /> },
        { path: '/news', element: <News /> },
        { path: '/newsletter', element: <Newsletter /> },
        { path: '/signLanguage', element: <SignLanguage /> },
      ]
    }
  ])
  return <RouterProvider router={router} />
}
export default App