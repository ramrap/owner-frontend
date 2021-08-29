export default function Checkbox(props) {
    const { label, placeholder, value, onChange, big } = props;
    return (
        <>
            <input
                type="checkbox"
                className="mr-1"
                placeholder={placeholder || `Enter ${label}`}
                checked={value}
                onChange={(event) => onChange(event.target.value)}
                style={big ? { transform: "scale(2)" } : {}}
                id={label}
            />
            {label && (
                <label className="form-control-label m-0" htmlFor={label}>
                    {label}
                </label>
            )}
        </>
    );
}
