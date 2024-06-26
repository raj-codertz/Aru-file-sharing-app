import Wrapper from "../assets/wrappers/BigSidebar"
import NavLinks from "./NavLinks"
import { useDashboardContext } from "../pages/DashboardLayout";
import logo from '../assets/images/logo.jpg'

const BigSidebar = () => {
    const { showSidebar } = useDashboardContext()

    return (
        <Wrapper>
            <div className={ showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar' }>
                <div className='content'>
                    <header>
                        <img src={logo} alt='logo' height={60} width={60} className="ml-10"/>
                    </header>
                    <NavLinks  isBigSidebar />
                </div>
            </div>
        </Wrapper>
        )
}
export default BigSidebar