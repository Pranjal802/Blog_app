import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            onClick={logoutHandler}
            className="px-4 py-2 transition-all duration-200 relative
            after:content-[''] after:absolute after:left-0 after:bottom-0 
            after:h-[3px] after:bg-blue-400 after:rounded-full 
            after:transition-all after:duration-300 after:w-0 hover:after:w-full"
        >
            Logout
        </button>
    );
};

export default LogoutBtn;
