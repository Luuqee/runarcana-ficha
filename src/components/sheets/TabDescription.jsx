// src/components/sheets/TabDescription.jsx
export default function TabDescription({ descricao, update }) {
  const handleChange = (campo, valor) => {
    update({
      descricao: {
        ...(descricao || {}),
        [campo]: valor,
      },
    });
  };

  return (
    <div className="tabDescricao">
      <div className="descricaoSection">
        <label className="descricaoLabel">
          Anotações
          <textarea
            value={descricao?.anotacoes || ""}
            onChange={(e) => handleChange("anotacoes", e.target.value)}
            placeholder="Anotações pessoais do personagem..."
            rows="6"
          />
        </label>
      </div>

      <div className="descricaoSection">
        <label className="descricaoLabel">
          Aparência
          <textarea
            value={descricao?.aparencia || ""}
            onChange={(e) => handleChange("aparencia", e.target.value)}
            placeholder="Nome, gênero, idade, descrição física..."
            rows="6"
          />
        </label>
      </div>

      <div className="descricaoSection">
        <label className="descricaoLabel">
          Personalidade
          <textarea
            value={descricao?.personalidade || ""}
            onChange={(e) => handleChange("personalidade", e.target.value)}
            placeholder="Traços marcantes, opiniões, ideais..."
            rows="6"
          />
        </label>
      </div>

      <div className="descricaoSection">
        <label className="descricaoLabel">
          Histórico
          <textarea
            value={descricao?.historico || ""}
            onChange={(e) => handleChange("historico", e.target.value)}
            placeholder="Infância, relação com a família, eventos marcantes, como começou a aventurar-se..."
            rows="6"
          />
        </label>
      </div>

      <div className="descricaoSection">
        <label className="descricaoLabel">
          Objetivo
          <textarea
            value={descricao?.objetivo || ""}
            onChange={(e) => handleChange("objetivo", e.target.value)}
            placeholder="Quais são seus objetivos? O que te motiva a aventurar-se?"
            rows="6"
          />
        </label>
      </div>
    </div>
  );
}