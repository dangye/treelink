import { createBrowserRouter } from "react-router"
import { Home } from './pages/home'
import { Admin } from './pages/admin'
import { Login } from './pages/login'
import { Private } from "./routes/Private"
import { Networks } from './pages/networks'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/admin",
    element: <Private><Admin/></Private>
  },
    {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/admin/social",
    element: <Private><Networks/></Private>
  },

])

export { router }