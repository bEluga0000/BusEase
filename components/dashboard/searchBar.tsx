import SearchBox from "./searchBox"
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { FaPersonArrowDownToLine } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import SearchButton from "./searchButton";
const SearchBar = () => {
    return <div className="h-screen border flex justify-center items-center pt-24">
        <div className="md:w-11/12 bg-white  md:h-24 md:grid md:grid-cols-4 dark:bg-[#1F1F1F] rounded-3xl flex flex-col  h-fit 
         sm:w-2/3 w-3/4">
            <div className="flex  items-center md:border-r-2 pl-2 h-24 border-b-2 md:border-b-0 ">
                <SearchBox placeholder="From" symbol={<FaPersonArrowUpFromLine />}/>
            </div>
            <div className="flex  items-center md:border-r-2 pl-1 h-24 border-b-2">

                <SearchBox placeholder="To" symbol={<FaPersonArrowDownToLine />}/>
            </div>
            <div className="flex  items-center border-r-2 pl-1 h-24 border-b-2">

                <SearchBox placeholder="Date" symbol={<MdDateRange />} secondPlace="2024"/>
            </div>
            <div className="flex  items-center bg-[#b03a43] justify-center md:rounded-r-3xl rounded-b-3xl h-20 md:h-full md:rounded-bl-none">
                <SearchButton/>
            </div>
        </div>
    </div>
}
export default SearchBar