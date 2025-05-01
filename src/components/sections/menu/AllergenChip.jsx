
const AllergenChip = ({item, idx}) => {
    return (
        <div>
            <span
                key={idx}
                className="text-xs bg-[#4B5728]/90  text-white px-3 py-1 rounded-full"
            >
                {item}
            </span>
        </div>
    )
}

export default AllergenChip