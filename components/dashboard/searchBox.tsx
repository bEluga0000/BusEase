import { TbBusStop } from "react-icons/tb";

interface SearchBoxProps {
    placeholder: string
    symbol: React.ReactNode
    secondPlace?: string
}
const SearchBox: React.FC<SearchBoxProps> = ({
    placeholder,
    symbol,
    secondPlace
}) => {
    return <div className="flex  items-center gap-3 ">
        <div className="text-[#c7c7c7] md:text-xl dark:text-[#d1cbcb]">
            {symbol}
        </div>
        <div className="flex flex-col gap-1 w-full">
            <div className="text-[#c7c7c7] md:text-xs text-sm  dark:text-[#d1cbcb] ">
                {placeholder}
            </div>
            <div >
                <input type="text" placeholder="place" className="text-[#393229] text-sm font-bold w-full outline-none p-1 dark:text-[#E0E0E0] dark:bg-[#1F1F1F] placeholder-[#393229] dark:placeholder-[#E0E0E0]" />
            </div>
            {secondPlace && <div className="text-[#c7c7c7] text-xs">
                {secondPlace}
            </div>}
        </div>
    </div>
}
export default SearchBox