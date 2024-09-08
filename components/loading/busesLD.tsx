import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const BusesLD = () => {
    return <div>

        <div className="p-3 w-full">
            <Skeleton
                className="w-full h-12"
                baseColor="var(--skeleton-base-color)"
                highlightColor="var(--skeleton-highlight-color)"
            />
        </div>
        <div className="gap-2 p-3 w-full flex flex-col">
            {
                [...Array(3)].map((_, index) => (
                    <Skeleton
                        className="w-full h-16"
                        baseColor="var(--skeleton-base-color)"
                        highlightColor="var(--skeleton-highlight-color)"
                    />
                ))
            }
        </div>
    </div>
}
export default BusesLD