import React,{useId} from "react";

const Input = React.forwardRef(function Input({
    label,
    type="text",
    className = "",
    ...props

}, ref){

    const id = useId();
    return (
        <div className="w-full">
            {
                label && <label className="inline-block mb-1 pl-1" htmlFor={id}></label>
            }
            <input
                type={type}
                className={` px-2 py-1 rounded-lg bg-white text-black outline-none focus:bg-grey-50 duration-200 border border-grey-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
           />
            
            
        </div>
    )
})

export default Input;