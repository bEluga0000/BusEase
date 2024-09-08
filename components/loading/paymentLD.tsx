import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const PaymnetLD = ()=>{
    return <div className="px-5 flex flex-col sm:grid md:grid-cols-2 md:gap-2">
        <div className="rounded-lg  h-32 md:h-72">
            <Skeleton
                className="w-full h-full"
                baseColor="var(--skeleton-base-color)"
                highlightColor="var(--skeleton-highlight-color)"
            />
        </div>
        <div className="rounded-lg h-32 md:h-72">
            <Skeleton
                className="w-full h-full"
                baseColor="var(--skeleton-base-color)"
                highlightColor="var(--skeleton-highlight-color)"
            />
        </div>
    </div>
}
export default PaymnetLD