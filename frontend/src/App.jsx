import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {
    HomeLayout,
    Landing,
    Register,
    Login,
    DashboardLayout,
    Error,
    UploadFile,
    UploadedFiles,
    Action,
    Profile
} from './pages'

import { action as registerAction} from './pages/Register.jsx'
import { action as loginAction} from './pages/Login.jsx'
import { action as uploadAction} from './pages/UploadFile.jsx'
import { action as profileAction} from './pages/Profile.jsx'
import { loader as dashboardLoader } from './pages/DashboardLayout.jsx'
import { loader as uploadedLoader } from './pages/UploadedFiles.jsx'

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
                action: registerAction
            },
            {
                path: "/login",
                element: <Login />,
                action: loginAction
            },
            {
                path: "/dashboard",
                element: <DashboardLayout />,
                loader: dashboardLoader,
                children: [
                   {
                    index: true,
                    element: <UploadFile />,
                    action: uploadAction
                   },
                   {
                      path: "uploaded-files",
                      element: <UploadedFiles />,
                      loader: uploadedLoader
                   },
                   {
                    path: "actions",
                    element: <Action />
                   },
                   {
                    path: "profile",
                    element: <Profile />,
                    action: profileAction
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