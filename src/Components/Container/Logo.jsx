import React from "react";

const Logo = ({width = '100px'}) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <img src="react.svg" alt="" />
        </div>
    )
}

export default Logo;