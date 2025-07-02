import { Button } from "../../ui/button"; 

export default function Category({ nombre, id, setCategory, selectedCategory }) {
    const handleClick = () => {
        setCategory(id);
    };

    return (
        <div>
            <Button 
                className={`border cursor-pointer rounded-3xl px-4 ${
                    selectedCategory === id 
                        ? "bg-[#E3870E] text-white border-[#E3870E] hover:bg-[#E3870E] hover:border-[#E3870E]" 
                        : "bg-[#eeeeee00] text-black hover:bg-[#eeeeee00] hover:border-[#E3870E] border-[#7d7d7d]"
                }`} 
                size="lg" 
                onClick={handleClick}>
                {nombre}
            </Button>
        </div>
    );
}