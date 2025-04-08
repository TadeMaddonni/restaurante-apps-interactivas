import { Button } from "../../ui/button"; // Import correcto
import React from "react";

export default function Category({ nombre, id, setCategory, selectedCategory }) {
    const handleClick = () => {
        setCategory(id);
    };

    return (
        <div>
            <Button 
                className={`border cursor-pointer rounded-3xl ${
                    selectedCategory === id 
                        ? "bg-[#E3870E] text-white border-[#E3870E]" 
                        : "bg-[#eeeeee00] text-black hover:bg-[#eeeeee00] hover:border-[#E3870E] border-[#7d7d7d]"
                }`} 
                size="lg" 
                onClick={handleClick}>
                {nombre}
            </Button>
        </div>
    );
}