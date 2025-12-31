import { useMemo } from "react";

export default function TabSpells({
  magias,
  magiaStats,
  openMagia,
  setOpenMagia,
  abrirModalCriarMagia,
  abrirModalEditarMagia,
  removeMagia,
  getElemVars,
  elementByKey,
  update,
}) {
  const list = Array.isArray(magias) ? magias : [];

  const stats = useMemo(() => {
    const s = magiaStats || {};
    return { cd: s.cd ?? 10, acerto: s.acerto ?? 0 };
  }, [magiaStats]);

  const toggle = (id) => setOpenMagia((prev) => (prev === id ? null : id));

  const setStat = (k, v) => {
    const num = Number(v);
    update({
      magiaStats: { ...(magiaStats || {}), [k]: Number.isFinite(num) ? num : 0 },
    });
  };

  const toggleEquip = (id) => {
    update({ magias: list.map((m) => (m.id === id ? { ...m, equipada: !m.equipada } : m)) });
  };

  const resolveElemColors = (elemKey) => {
    const fromFn = safeGetVars(getElemVars, elemKey);
    const fromMap = safeGetFromMap(elementByKey, elemKey);
    const src = { ...(fromMap || {}), ...(fromFn || {}) };

    const c1 =
      src.color || src.c1 || src.primary || src.main || src.hex || src.base || "#8d49ff";
    const c2 =
      src.color2 || src.c2 || src.secondary || src.alt || src.hex2 || src.base2 || c1;

    const label = src.label || src.name || src.nome || src.title || elemKey;

    return { c1, c2, label };
  };

  const format = (v) => (v && String(v).trim() ? v : "—");

  return (
    <div>
      <div className="magiaTop">
        <div className="magiaStat">
          <span>CD DE MAGIA</span>
          <input type="number" value={stats.cd} onChange={(e) => setStat("cd", e.target.value)} />
        </div>

        <div className="magiaStat">
          <span>ACERTO DE MAGIA</span>
          <input
            type="number"
            value={stats.acerto}
            onChange={(e) => setStat("acerto", e.target.value)}
          />
        </div>

        <button className="ataqueAdd" type="button" onClick={abrirModalCriarMagia}>
          + Adicionar Magia
        </button>
      </div>

      <div className="ataquesList" style={{ marginTop: 10 }}>
        {list.length === 0 ? (
          <div className="hint">Nenhuma magia adicionada.</div>
        ) : (
          list.map((m) => {
            const isOpen = openMagia === m.id;

            const elemKey = m.elementoKey || m.elemento || m.element || "arcano";
            const { c1, c2, label: elemLabel } = resolveElemColors(elemKey);

            return (
              <div key={m.id} className="spellCard" style={{ "--elem": c1, "--elem2": c2 }}>
                <div className="spellHeader" onClick={() => toggle(m.id)} role="button" tabIndex={0}>
                  <span className={`spellSeta ${isOpen ? "aberta" : ""}`}>▾</span>

                  <input
                    className="spellEquip"
                    type="checkbox"
                    checked={!!m.equipada}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleEquip(m.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    title="Preparada/Equipada"
                  />

                  <span className="spellDot" />

                  <div className="spellNameBox">
                    <div className="spellName">{m.nome || "Sem nome"}</div>

                    {/* ✅ quando abrir, mostra uma linha menor com Tipo + Elemento */}
                    {isOpen && (
                      <div className="spellMini">
                        {format(m.tipo)} • {format(elemLabel)}
                      </div>
                    )}
                  </div>
                </div>

                {/* ✅ ABERTO: linhas alinhadas certinho */}
                {isOpen && (
                  <div className="spellBody">
                    <div className="spellInfoGrid">
                      <div className="spellLine">
                        <div className="spellLbl">Tipo</div>
                        <div className="spellVal">{format(m.tipo)}</div>
                      </div>

                      <div className="spellLine">
                        <div className="spellLbl">Elemento</div>
                        <div className="spellVal">{format(elemLabel)}</div>
                      </div>

                      <div className="spellLine">
                        <div className="spellLbl">Conjuração</div>
                        <div className="spellVal">{format(m.conjuracao || m.tempo)}</div>
                      </div>

                      <div className="spellLine">
                        <div className="spellLbl">Duração</div>
                        <div className="spellVal">{format(m.duracao)}</div>
                      </div>

                      <div className="spellLine">
                        <div className="spellLbl">Área</div>
                        <div className="spellVal">{format(m.area)}</div>
                      </div>

                      <div className="spellLine">
                        <div className="spellLbl">Alvos</div>
                        <div className="spellVal">{format(m.alvos)}</div>
                      </div>

                      <div className="spellLine">
                        <div className="spellLbl">Alcance</div>
                        <div className="spellVal">{format(m.alcance)}</div>
                      </div>
                    </div>

                    <div className="spellDescBlock">
                      <div className="spellLbl">Descrição</div>
                      <div className="spellDesc">{m.desc?.trim() ? m.desc : "—"}</div>
                    </div>

                    <div className="ataqueActions">
                      <button className="ghostBtn" type="button" onClick={() => abrirModalEditarMagia(m.id)}>
                        Editar
                      </button>
                      <button className="danger" type="button" onClick={() => removeMagia(m.id)}>
                        Remover
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function safeGetVars(fn, key) {
  try {
    if (typeof fn !== "function") return null;
    return fn(key) || null;
  } catch {
    return null;
  }
}

function safeGetFromMap(map, key) {
  try {
    if (!map || typeof map.get !== "function") return null;
    return map.get(key) || null;
  } catch {
    return null;
  }
}
