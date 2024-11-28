import { Link } from "react-router-dom"
import OOK_logo from '@/assets/ook_logo.png'
import { toCamelCase } from "@/helpers/camel-case";

interface Link {
    name: string;
    url: string;
}

interface ISideNavbar {
    role: string
    handleLogout: () => void
    links: Link[]
}

export const SideNavbar = ({ role, handleLogout, links }: ISideNavbar) => {
    return (
        <nav className="nav-sidebar h-dvh shadow">
            <div className="logo-cont shadow-md">
                <img src={OOK_logo} alt="ook_logo"/>
                <div className="leading-3 h-full">
                    <span className="text-xl font-medium">OOK</span> <br />
                    {toCamelCase(role)}
                </div>
            </div>
            <div className="student-links">
                {links.map(({ name, url }, index) => (
                    <Link to={url} key={index}>
                        <div className="student-nav-link w-full">
                            {name}
                        </div>
                    </Link>
                ))}
                <div className="student-nav-link w-full" id="logout-btn-in-links" onClick={handleLogout}>
                    Log Out
                </div>
            </div>
        </nav>
    )
}