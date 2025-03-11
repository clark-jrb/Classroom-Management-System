import { Link, useMatch } from "react-router-dom"
import OOK_logo from '@/assets/ook_logo.png'
import { toCamelCase } from "@/helpers/camel-case";
import { Roles } from "@/types/global.types";
import React from "react";
import { LogOut } from "lucide-react";

interface Link {
    name: React.ReactNode;
    url: string;
}

interface ISideNavbar {
    role: Roles
    handleLogout: () => void
    links: Link[]
}

export const SideNavbar = ({ role, handleLogout, links }: ISideNavbar) => {
    function handleMatched(url: string) {
        const isMatched = useMatch(url)
        return isMatched
    }
    return (
        <nav className="nav-sidebar h-dvh border-r shadow-sm">
            <div className="logo-cont shadow-sm px-4">
                <img src={OOK_logo} alt="ook_logo"/>
                <div className="leading-3 h-full">
                    <span className="text-xl font-medium">OOK</span> <br />
                    {toCamelCase(role)}
                </div>
            </div>
            <div className="side-bar-links px-4 flex flex-col gap-2 pb-4">
                {links.map(({ name, url }, index) => (
                    <Link to={url} key={index}>
                        <div className={`side-nav-link ${handleMatched(url) ? 'active': ''} rounded-md hover:shadow-sm`}>
                            {name}
                        </div>
                    </Link>
                ))}
                <div className="flex gap-2 mt-auto side-nav-link rounded-md hover:shadow-sm" id="logout-btn-in-links" onClick={handleLogout}>
                    <LogOut strokeWidth={1} />Log Out
                </div>
            </div>
        </nav>
    )
}