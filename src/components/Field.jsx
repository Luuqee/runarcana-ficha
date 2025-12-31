export default function Field({ label, value, onChange, placeholder }) {
  return (
    <div className="field">
      <div className="fieldLabel">{label}</div>
      <input
        className="fieldInput"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
