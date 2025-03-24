import React from "react";
import {Container, Logo, LogoutBtn} from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";


const Header = () => {

    const navigate = useNavigate();
    const authStatus = useSelector( (state) => state.auth.status)

    const navItems = [
        {
            name:'Home',
            to:'/',
            active: true,
        },
        {
            name:'Login',
            to:'/login',
            active: !authStatus,
        },
        {
            name:'Signup',
            to:'/signup',
            active: !authStatus,
        },
        {
            name:'All Posts',
            to:'/all-posts',
            active:authStatus,
        },

    ]

    return (
        <header className="py-3 shadow bg-white rounded-4xl">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo width="70px"/>
                        </Link>
                    </div>

                    <ul className="flex ml-auto">
                        {
                            navItems.map( (item) =>
                                item.active 
                                ? <li key={item.name}>
                                    <button className="inline-block px-6 py-2 relative transition duration-200 
                                    hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 
                                    after:w-0 after:h-[3px] after:bg-blue-400 after:transition-all after:duration-300 
                                    after:rounded-full"
                                    onClick={ () => navigate(item.to) }
                                    >
                                        {item.name}</button>
                                </li>
                                : null
                            )
                        }

                        {
                            authStatus &&
                            <li>
                                <LogoutBtn/>
                            </li>
                        }

                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;