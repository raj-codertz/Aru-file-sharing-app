import { useDashboardContext } from "../pages/DashboardLayout"
import Wrapper from "../assets/wrappers/SmallSidebar"
import {FaTimes} from "react-icons/fa"
import NavLinks from "./NavLinks.jsx";

const SmallSidebar = () => {
   const {showSidebar, toggleSidebar } = useDashboardContext()

    return (
        <Wrapper>
            <div className={
                showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
            }>
                <div className='content'>
                    <button type='button' className='close-btn' onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                     <header>
                         {/* <Logo /> */}
                         <h3>ARU File System</h3>
                     </header>
                     <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}
export default SmallSidebar