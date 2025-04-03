import React from "react";


const Title = ({ text, className }) => {
    return (
        <h1 className={`font-leotaro text-2xl ${className}`}>
            {text}
        </h1>
    );
}

export default Title;