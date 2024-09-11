import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TicketCardsLD = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 md:gap-x-6">
            {
                [...Array(4)].map((_, index) => (
                    <div key={index} className="rounded-lg h-32 md:h-72">
                        <Skeleton
                            className="w-full h-full"
                            baseColor="var(--skeleton-base-color)"
                            highlightColor="var(--skeleton-highlight-color)"
                        />
                    </div>
                ))
            }
        </div>
    );
}

export default TicketCardsLD;
