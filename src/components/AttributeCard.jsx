export default function AttributeCard({ label, value, onChange }) {
  const score = Number(value) || 0;
  const mod = Math.floor((score - 10) / 2);
  const modText = `${mod >= 0 ? "+" : ""}${mod}`;

  return (
    <div className="attrCard">
      <div className="attrLabel">{label.toUpperCase()}</div>

      <div className="attrRow">
        <div className="attrMod" title="Modificador">
          {modText}
        </div>

        <input
          className="attrInput"
          type="number"
          value={score}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
