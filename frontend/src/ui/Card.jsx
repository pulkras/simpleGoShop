export default function Card({ children, className = "" }) {
    return (
        <div className={`border rounded-lg p-4 shadow-sm bg-white ${className}`}>
            {children}
        </div>
    );
}