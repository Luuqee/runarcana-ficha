export function mod(v) {
  const n = Number(v) || 0;
  return Math.floor((n - 10) / 2);
}

export function clampBar(bar) {
  const atual = Number(bar?.atual) || 0;
  const max = Number(bar?.max) || 0;

  const safeMax = Math.max(0, max);
  const safeAtual = Math.max(0, Math.min(atual, safeMax || atual));

  return { atual: safeAtual, max: safeMax };
}

export function buildElementMap(ELEMENTOS) {
  const map = new Map();
  for (const e of ELEMENTOS) map.set(e.key, e);
  return map;
}

export function getElemVars(elementByKey, key) {
  const e = elementByKey.get(key) || elementByKey.get("sombrio");
  const c1 = e?.c1 || "#d6b35a";
  const c2 = e?.c2 || "#ffffff";
  return { "--e1": c1, "--e2": c2 };
}
