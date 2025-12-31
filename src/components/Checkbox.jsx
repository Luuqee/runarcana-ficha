export default function Checkbox({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`check ${checked ? "check--on" : ""}`}
      onClick={() => onChange(!checked)}
      aria-label="Proficiência"
    />
  );
}
