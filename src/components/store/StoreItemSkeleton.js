export default function StoreItemSkeleton() {
    return (
        <div className="px-3 py-5 w-fit first-letter:rounded-md shadow-2xl rounded-md bg-slate-900">
            <div className="h-40 w-80 bg-slate-500 rounded-md animate-pulse mb-5"></div>
            <div className="bg-slate-500 rounded-md animate-pulse w-fit mb-3">
                <span className="invisible">
                    Long Skeleton Weapon Name
                </span>
            </div>
            <div className="bg-slate-500 rounded-md animate-pulse w-fit">
                <span className="invisible">
                    Skeleton Weapon Cost
                </span>
            </div>
        </div>
    );
}