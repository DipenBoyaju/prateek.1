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
import Publication from "./pages/Publication/Publication"
import SingleProject from "./pages/Project/SingleProject"
import Gallery from "./pages/Gallery/Gallery"
import MemberDetail from "./pages/Team/MemberDetail"
import AddTeamMember from "./dashboard/pages/Teams/AddTeamMember"
import DasMemberDetails from "./dashboard/pages/Teams/DasMemberDetails"
import ManagementTeam from "./dashboard/pages/Teams/ManagementTeam"
import ConsultantsTeam from "./dashboard/pages/Teams/ConsultantsTeam"
import EditTeamMember from "./dashboard/pages/Teams/EditTeamMember"
import CIIATC from "./dashboard/pages/ResearchWings/CIIATC"
import DasProjects from "./dashboard/pages/Projects/DasProjects"
import DasEvent from "./dashboard/pages/Events/DasEvent"
import AddEvent from "./dashboard/pages/Events/AddEvent"
import DasNews from "./dashboard/pages/News/DasNews"
import AddNews from "./dashboard/pages/News/AddNews"
import EditNews from "./dashboard/pages/News/EditNews"
import DasNewsDetail from "./dashboard/pages/News/DasNewsDetail"
import DasEventDetail from "./dashboard/pages/Events/DasEventDetail"
import EditEvent from "./dashboard/pages/Events/EditEvent"
import DasGallery from "./dashboard/pages/gallery/DasGallery"
import DasNewsletter from "./dashboard/pages/newsletter/DasNewsletter"
import AddProject from "./dashboard/pages/Projects/AddProject"
import EditProject from "./dashboard/pages/Projects/EditProject"
import DasProjectDetail from "./dashboard/pages/Projects/DasProjectDetail"
import DasSubProjectDetail from "./dashboard/pages/Projects/SubProject/DasSubProjectDetail"
import AddSubProject from "./dashboard/pages/Projects/SubProject/AddSubProject"
import EditSubProject from "./dashboard/pages/Projects/SubProject/EditSubProject"
import EventDetails from "./pages/Events/EventDetails"
import Profile from "./dashboard/pages/profile/Profile"

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/', element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/division', element: <Research /> },
        { path: '/division/:slug', element: <ResearchDetails /> },
        { path: '/publication', element: <Publication /> },
        { path: '/team', element: <Team /> },
        { path: '/team/:slug', element: <MemberDetail /> },
        { path: '/project', element: <Project /> },
        { path: '/projects/:slug', element: <ProjectDetails /> },
        { path: '/projects/:mainSlug/:slug', element: <SingleProject /> },
        { path: '/demos', element: <Product /> },
        { path: '/contact', element: <Contact /> },
        { path: '/blog', element: <Blog /> },
        { path: '/events', element: <Events /> },
        { path: '/event/:slug', element: <EventDetails /> },
        { path: '/news', element: <News /> },
        { path: '/newsletter', element: <Newsletter /> },
        { path: '/gallery', element: <Gallery /> },
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

            { path: 'profile', element: <Profile /> },

            //research-wings
            { path: "chmc", element: <CHMC /> },
            { path: "ccct", element: <CCCT /> },
            { path: "ccei", element: <CCEI /> },
            { path: "ciiatc", element: <CIIATC /> },

            //team
            { path: "team/executive", element: <ExecutiveTeam /> },
            { path: "team/research", element: <ResearchTeam /> },
            { path: "team/development", element: <DevelopmentTeam /> },
            { path: "team/management", element: <ManagementTeam /> },
            { path: "team/consultants", element: <ConsultantsTeam /> },
            { path: "team/:department/:slug", element: <DasMemberDetails /> },
            { path: "team/addmember", element: <AddTeamMember /> },
            { path: "team/editMember/:slug", element: <EditTeamMember /> },

            //project
            { path: "projects", element: <DasProjects /> },
            { path: "projects/addProject", element: <AddProject /> },
            { path: "project/editproject/:slug", element: <EditProject /> },
            { path: "project/:slug", element: <DasProjectDetail /> },
            { path: "project/:mainSlug/:slug", element: <DasSubProjectDetail /> },
            { path: "project/:mainSlug/addProject", element: <AddSubProject /> },
            { path: "project/:mainSlug/:slug/editProject", element: <EditSubProject /> },

            //events
            { path: "events", element: <DasEvent /> },
            { path: "events/addevent", element: <AddEvent /> },
            { path: "events/updateEvent/:slug", element: <EditEvent /> },
            { path: "events/:slug", element: <DasEventDetail /> },

            //news
            { path: "news", element: <DasNews /> },
            { path: "news/addnews", element: <AddNews /> },
            { path: "news/editnews/:slug", element: <EditNews /> },
            { path: "news/:slug", element: <DasNewsDetail /> },

            //newsletter
            { path: "newsletter", element: <DasNewsletter /> },

            { path: "gallery", element: <DasGallery /> }
          ]
        }
      ]
    }
  ])
  return <RouterProvider router={router} future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }} />
}
export default App