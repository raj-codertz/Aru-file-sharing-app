import logo from "../assets/images/logo.jpg"
import {Outlet, useLocation} from "react-router-dom";
import { Link } from "react-router-dom";

const HomeLayout = () => {
    const location = useLocation()
    const hideHeaderPath = ['/dashboard', '/dashboard/profile', '/dashboard/update-files', '/dashboard/uploaded-files', '/dashboard/actions']

    const shouldHideHeader = hideHeaderPath.includes(location.pathname);
    return (
        <>
            { !shouldHideHeader && (
                <header className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <Link to='/'>
                            <a className="block text-teal-600" href="#">
                                <img src={logo} alt="logo" height={40} width={70} />
                            </a>
                            </Link>
                            <h3 className="text-2xl">ARU FILES MANAGEMENT SYSTEM</h3>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <Link to='/login'>
                                <a
                                    className="rounded-md bg-[#443ebe] px-5 py-2.5 text-sm font-medium text-white shadow"
                                    href="#"
                                >
                                    Login
                                </a>
                                </Link>
                                
                                <div className="hidden sm:flex">
                                    <Link to='/register'>
                                    <a
                                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                                        href="#"
                                    >
                                        Register
                                    </a>
                                    </Link>
                                    
                                </div>
                            </div>

                            <div className="block md:hidden">
                                <button
                                    className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            )}     
            <Outlet/>
        </>
    )
}
export default HomeLayout