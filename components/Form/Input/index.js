export default function Input(props) {
    const { label, placeholder, value, onChange, ...rest } = props;
    return (
        <>
            {label && <label className="form-control-label">{label}</label>}
            <input
                className="form-control"
                placeholder={placeholder || `Enter ${label}`}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                {...rest}
                onWheel={(e) => e.target.blur()}
            />
        </>
    );
}
