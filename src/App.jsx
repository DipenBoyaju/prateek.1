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
import DashboardLayout from "./dashboard/layout/DashboardLayout"
import DashboardHome from "./dashboard/pages/dashboardHome/DashboardHome"
import DashboardEvents from "./dashboard/pages/updates/Events"
import DashboardNews from "./dashboard/pages/updates/News"
import CHMC from "./dashboard/pages/ResearchWings/CHMC"
import CCCT from "./dashboard/pages/ResearchWings/CCCT"
import CCEI from "./dashboard/pages/ResearchWings/CCEI"
import AdminSignup from "./pages/AdminSignup/AdminSignup"
import UserLogin from "./pages/UserLogin/UserLogin"
import ExecutiveTeam from "./dashboard/pages/Teams/ExecutiveTeam"
import ResearchTeam from "./dashboard/pages/Teams/ResearchTeam"
import DevelopmentTeam from "./dashboard/pages/Teams/DevelopmentTeam"
import ProtectedRoute from "./features/ProtectedRoute"
import ResearchDetails from "./pages/Research/ResearchDetails"
import Product from "./pages/products/Product"
import ProjectDetails from "./pages/Project/ProjectDetails"

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/', element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/division', element: <Research /> },
        { path: '/division/:slug', element: <ResearchDetails /> },
        { path: '/team', element: <Team /> },
        { path: '/project', element: <Project /> },
        { path: '/signlanguage', element: <ProjectDetails /> },
        { path: '/product', element: <Product /> },
        { path: '/contact', element: <Contact /> },
        { path: '/blog', element: <Blog /> },
        { path: '/events', element: <Events /> },
        { path: '/news', element: <News /> },
        { path: '/newsletter', element: <Newsletter /> },
        { path: '/signLanguageplatform', element: <SignLanguage /> },
        { path: '/admin-signup', element: <AdminSignup /> },
        { path: '/login', element: <UserLogin /> },
      ]
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: [
            { index: true, element: <DashboardHome /> },
            { path: "chmc", element: <CHMC /> },
            { path: "ccct", element: <CCCT /> },
            { path: "ccei", element: <CCEI /> },
            { path: "team/executive", element: <ExecutiveTeam /> },
            { path: "team/research", element: <ResearchTeam /> },
            { path: "team/development", element: <DevelopmentTeam /> },
            { path: "events", element: <DashboardEvents /> },
            { path: "news", element: <DashboardNews /> },
          ]
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}
export default App