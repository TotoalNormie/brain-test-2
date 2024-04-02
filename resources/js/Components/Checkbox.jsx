export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-text text-accent shadow-sm focus:ring-accent ' +
                className
            }
        />
    );
}
