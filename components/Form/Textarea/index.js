export default function Textarea(props) {
    const { label, placeholder, value, onChange, ...rest } = props;
    return (
        <>
            {label && <label className="form-control-label">{label}</label>}
            <textarea
                className="form-control"
                placeholder={placeholder || `Enter ${label}`}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                {...rest}
            />
        </>
    );
}
