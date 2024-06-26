import { useDashboardContext} from "../pages/DashboardLayout";
import links from '../utils/links'
import {NavLink} from "react-router-dom";

const NavLinks = ( { isBigSidebar } ) => {
    const { toggleSidebar, user } = useDashboardContext()

    return (
        <div className='nav-links'>
            {links.map( link => {
             const { text, path, icon } = link
                const { role } = user
                if (path === 'actions' && role === 'secretary') return
                // else if (path === 'actions' && role !== 'dean') return 
                // else if (path === 'actions' && role !== 'dvs') return 
                // else if ( path === '.' && role !== 'secretary' ) return

                return (
                        <NavLink to={path} key={text} className='nav-link' onClick={ isBigSidebar ? null : toggleSidebar} end>
                            <span className='icon'>{icon }</span>
                            {text}
                        </NavLink>
                    )
                }
            )}
        </div>
    )
}
export default NavLinks