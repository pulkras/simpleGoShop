export default function EmptyState({
    title = "Nothing here",
    description = "",
    action,
}) {
    return (
        <div className="text-center py-10">
            <div className="text-xl font-semibold mb-2">
                {title}
            </div>

            {description && (
                <div className="text-gray-500 mb-4">
                    {description}
                </div>
            )}

            {action}
        </div>
    );
}