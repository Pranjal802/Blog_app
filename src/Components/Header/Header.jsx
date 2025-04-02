import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const location = useLocation(); // Get current path

    const navItems = [
        { name: "Home", to: "/", active: true },
        { name: "All Posts", to: "/all-posts", active: authStatus },
        { name: "Add Post", to: "/add-post", active: authStatus },
        { name: "Login", to: "/login", active: !authStatus },
        { name: "Signup", to: "/signup", active: !authStatus },
    ];

    return (
        <header className="py-3 shadow bg-white rounded-4xl">
            <Container>
                <nav className="flex items-center justify-between">
                    {/* Left: Logo */}
                    <div>
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    {/* Right: Nav Links & Logout */}
                    <div className="flex items-center gap-6">
                        {navItems.map((item) =>
                            item.active ? (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className={`px-4 py-2 transition-all duration-200 relative
                                        after:content-[''] after:absolute after:left-0 after:bottom-0 
                                        after:h-[3px] after:bg-blue-400 after:rounded-full 
                                        after:transition-all after:duration-300 
                                        ${location.pathname === item.to ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
                                >
                                    {item.name}
                                </Link>
                            ) : null
                        )}
                        {authStatus && <LogoutBtn />}
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
