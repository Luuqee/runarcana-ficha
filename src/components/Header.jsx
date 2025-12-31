export default function Header() {
  return (
    <div className="topbar">
      <div className="brand">
        <div className="logo">R</div>
        <div className="brandText">
          <div className="brandTitle">RUNARCANA RPG</div>
          <div className="brandSub">Ficha do Personagem</div>
        </div>
      </div>

      <div className="topActions">
        <button className="btn">Salvar</button>
        <button className="btn btnGhost">Imprimir</button>
      </div>
    </div>
  );
}
