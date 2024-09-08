import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const BusDestailLD = ()=>{
    return <div>
        <div className="sm:grid sm:grid-cols-2 flex flex-col gap-2 p-2">
            <div>
                <div className="text-lg font-bold text-center uppercase">
                    Seats and Ticket
                </div>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-1  lg:grid-cols-8  py-1  p-2">
                    {
                        [...Array(10)].map((_, index) => (
                            <Skeleton
                                className="w-full h-8"
                                baseColor="var(--skeleton-base-color)"
                                highlightColor="var(--skeleton-highlight-color)"
                            />
                        ))
                    }

                </div>
            </div>
            <div className="">
                <Skeleton
                    className="w-full h-52"
                    baseColor="var(--skeleton-base-color)"
                    highlightColor="var(--skeleton-highlight-color)"
                />
        </div>
    </div>

    </div>
}
export default BusDestailLD