// src/components/sheets/CenterPanel.jsx
import { ATTRS } from "../../data/sheetConstants";
import { mod } from "../../utils/sheetUtils";

export default function CenterPanel({ skills, attrs, prof, update }) {
  return (
    <div className="center">
      <div className="skillsTitle">PERÍCIAS</div>
      <div className="skillsHeader">
        <div>Treino</div>
        <div>Perícia</div>
        <div>Atributo</div>
        <div>Bônus</div>
      </div>

      <div className="skillsList">
        {skills.map((s, i) => {
          const bonus = mod(attrs[s.attr]) + (s.trained ? Number(prof || 0) : 0);
          return (
            <div key={s.name} className="skill">
              <input
                name={`skill_trained_${i}`}
                type="checkbox"
                checked={s.trained}
                onChange={(e) =>
                  update({
                    skills: skills.map((x, idx) =>
                      idx === i ? { ...x, trained: e.target.checked } : x
                    ),
                  })
                }
              />
              <span>{s.name}</span>
              <select
                name={`skill_attr_${i}`}
                value={s.attr}
                onChange={(e) =>
                  update({
                    skills: skills.map((x, idx) =>
                      idx === i ? { ...x, attr: e.target.value } : x
                    ),
                  })
                }
              >
                {ATTRS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
              <b>{bonus >= 0 ? `+${bonus}` : bonus}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
}