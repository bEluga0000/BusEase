import { TbArrowsExchange } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";

const BusesBarEdit = () => {
    return (
        <div className="h-24 flex items-center bg-[#f4f4f4] dark:bg-[#1f1f1f]">
            <div className="md:grid md:grid-cols-12 w-full hidden gap-1.5 px-2">
                <div className="col-span-3 flex flex-col justify-center">
                    <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                        From
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                        />
                    </div>
                </div>
                <div className="col-span-1 flex items-center justify-center text-[#999999] dark:text-[#a0a0a0] text-2xl">
                    <TbArrowsExchange />
                </div>
                <div className="col-span-3 flex flex-col justify-center">
                    <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                        To
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                        />
                    </div>
                </div>
                <div className="col-span-3 flex flex-col justify-center">
                    <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                        Date
                    </div>
                    <div>
                        <input
                            type="date"
                            className="w-full border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                        />
                    </div>
                </div>
                <div className="col-span-2 flex items-center text-base justify-center px-1 w-full gap-1 lg:gap-4">
                    <div className="px-2.5 py-1.5 rounded-lg bg-[#d84f55] dark:bg-[#c0392b] text-[#fcfafd] dark:text-[#fafafa] font-bold cursor-pointer">
                        Search
                    </div>
                    <div className="text-[#7f7c7c] dark:text-[#b0b0b0] text-2xl cursor-pointer">
                        <MdOutlineCancel />
                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className="flex flex-col md:hidden justify-between gap-1">
                <div className="grid grid-cols-10  px-2 pt-1">
                    <div className="col-span-3 flex flex-col justify-center">
                        <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                            From
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-full border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                            />
                        </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-center text-[#999999] dark:text-[#a0a0a0] text-2xl">
                        <TbArrowsExchange />
                    </div>
                    <div className="col-span-3 flex flex-col justify-center">
                        <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                            To
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-full border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col justify-center">
                        <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                            Date
                        </div>
                        <div>
                            <input
                                type="date"
                                className="w-fit border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-16">
                    <div className="px-2.5 py-1 rounded-lg bg-[#d84f55] dark:bg-[#c0392b] text-[#fcfafd] dark:text-[#fafafa] font-bold cursor-pointer">
                        Search
                    </div>
                    <div className="text-[#7f7c7c] dark:text-[#b0b0b0] text-2xl cursor-pointer">
                        <MdOutlineCancel />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusesBarEdit;
