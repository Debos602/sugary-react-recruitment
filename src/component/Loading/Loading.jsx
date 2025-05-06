export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-xl font-mono">
                <span className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-gray-800 pr-1">
                    Loading...
                </span>
            </div>
        </div>
    );
}
