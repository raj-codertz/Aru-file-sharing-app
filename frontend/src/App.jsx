import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {
    HomeLayout,
    Landing,
    Register,
    Login,
    DashboardLayout,
    Error,
    UploadFile
} from './pages'

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/dashboard",
                element: <DashboardLayout />,
                children: [
                   {
                    index: true,
                    element: <UploadFile />
                   }
                ]
            }
        ]
    }
])

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}
export default App