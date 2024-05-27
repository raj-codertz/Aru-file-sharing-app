import Wrapper from "../assets/wrappers/Dashboard"
import {BigSidebar, Navbar, SmallSidebar} from "../components"
import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom"
import { useContext, createContext, useState } from "react"
import customFetch from "../utils/customFetch.js";
import { toast} from "react-toastify";

// creating a context for the dashboard
const DashboardContext = createContext()

// export const loader = async () => {
//     try {
//       const { data } = await customFetch.get('users/current-user')
//         return data
//     } catch (error) {
//         return redirect('/')
//     }
// }

const DashboardLayout = ( isDarkThemeEnabled ) => {
    //  const {user} = useLoaderData()
    const user = { name: 'Rajabu shabani'}
    

    const navigate = useNavigate()

    const [showSidebar, setShowSidebar] = useState(false)

    
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    const logoutUser = async () => {
         navigate('/')
         await customFetch.get('/auth/logout')
         toast.success('Logout successful')
    }

    return (
        <DashboardContext.Provider value={{
            user,
            showSidebar,
            toggleSidebar,
            logoutUser

        }}>
            <Wrapper>
                <main className='dashboard'>
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className='dashboard-page'>
                            <Outlet  context={{ user }}/>
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>

    )
}

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout