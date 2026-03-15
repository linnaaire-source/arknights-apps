// src/hooks/useOperators.js
import { useState, useEffect } from "react";

const CLASSES = ["Guard", "Caster", "Medic", "Sniper", "Vanguard", "Supporter", "Defender", "Specialist"];

const INITIAL_OPERATORS = [
  { id: "char_1012_skadi2", name: "Skadi the Corrupting Heart", shortName: "Skadi",      class: "Supporter", rarity: 6, imageKey: "char_1012_skadi2", fallbackColor: "#1a2a4a", glowColor: "#3a7acd" },
  { id: "char_113_quartz",  name: "Eyjafjalla",                 shortName: "Eyjafjalla", class: "Caster",    rarity: 6, imageKey: "char_113_quartz",  fallbackColor: "#2a1a3a", glowColor: "#9a4acd" },
  { id: "char_003_kalts",   name: "Kal'tsit",                   shortName: "Kal'tsit",   class: "Medic",     rarity: 6, imageKey: "char_003_kalts",   fallbackColor: "#1a2a2a", glowColor: "#4acdcd" },
  { id: "char_010_chen",    name: "Ch'en",                      shortName: "Ch'en",      class: "Guard",     rarity: 6, imageKey: "char_010_chen",    fallbackColor: "#2a1a1a", glowColor: "#cd4a4a" },
  { id: "char_002_amiya",   name: "Amiya",                      shortName: "Amiya",      class: "Caster",    rarity: 5, imageKey: "char_002_amiya",   fallbackColor: "#1a1a2a", glowColor: "#8a4acd" },
  { id: "char_222_bpipe",   name: "Bagpipe",                    shortName: "Bagpipe",    class: "Vanguard",  rarity: 6, imageKey: "char_222_bpipe",   fallbackColor: "#0a2a1a", glowColor: "#4acd8a" },
  { id: "char_375_surge",   name: "Surtr",                      shortName: "Surtr",      class: "Guard",     rarity: 6, imageKey: "char_375_surge",   fallbackColor: "#2a1010", glowColor: "#cd5020" },
  { id: "char_293_thorns",  name: "Thorns",                     shortName: "Thorns",     class: "Guard",     rarity: 6, imageKey: "char_293_thorns",  fallbackColor: "#102a10", glowColor: "#50cd30" },
];

export { CLASSES };

export function getOperatorImageUrl(imageKey) {
  return `https://raw.githubusercontent.com/Aceship/Arknight-Images/main/characters/${imageKey}_1.png`;
}
export function getOperatorAvatarUrl(imageKey) {
  return `https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/${imageKey}.png`;
}

// Hook de solo lectura para el grid de la home
export function useOperators() {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const results = await Promise.allSettled(
          INITIAL_OPERATORS.map(async (op) => {
            const res = await fetch(
              `https://awedtan.ca/api/operator/${op.id}?include=data.name,data.phases,data.rarity`,
              { signal: AbortSignal.timeout(5000) }
            );
            if (!res.ok) throw new Error("API error");
            const json     = await res.json();
            const phase    = json?.value?.data?.phases?.slice(-1)[0];
            const keyFrame = phase?.attributesKeyFrames?.slice(-1)[0]?.data;
            return {
              ...op,
              atk: keyFrame?.atk    ?? "—",
              def: keyFrame?.def    ?? "—",
              hp:  keyFrame?.maxHp  ?? "—",
              imageUrl:  getOperatorImageUrl(op.imageKey),
              avatarUrl: getOperatorAvatarUrl(op.imageKey),
            };
          })
        );
        const merged = INITIAL_OPERATORS.map((op, i) =>
          results[i].status === "fulfilled"
            ? results[i].value
            : { ...op, atk: "—", def: "—", hp: "—", imageUrl: getOperatorImageUrl(op.imageKey), avatarUrl: getOperatorAvatarUrl(op.imageKey) }
        );
        setOperators(merged);
      } catch (err) {
        setError(err.message);
        setOperators(INITIAL_OPERATORS.map((op) => ({
          ...op, atk: "—", def: "—", hp: "—",
          imageUrl: getOperatorImageUrl(op.imageKey), avatarUrl: getOperatorAvatarUrl(op.imageKey),
        })));
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return { operators, loading, error };
}

// Hook CRUD para la página de gestión
export function useOperatorsCrud() {
  const [operators, setOperators] = useState(() => {
    try {
      const saved = localStorage.getItem("arknights-operators");
      return saved ? JSON.parse(saved) : INITIAL_OPERATORS;
    } catch {
      return INITIAL_OPERATORS;
    }
  });

  useEffect(() => {
    localStorage.setItem("arknights-operators", JSON.stringify(operators));
  }, [operators]);

  function filterOperators(search, classFilter) {
    return operators.filter((op) => {
      const matchesSearch =
        search === "" ||
        op.shortName.toLowerCase().includes(search.toLowerCase()) ||
        op.name.toLowerCase().includes(search.toLowerCase()) ||
        op.class.toLowerCase().includes(search.toLowerCase());
      const matchesClass = classFilter === "Todos" || op.class === classFilter;
      return matchesSearch && matchesClass;
    });
  }

  function addOperator(newOp) {
    const id = `char_custom_${Date.now()}`;
    const operator = {
      ...newOp,
      id,
      imageKey:     newOp.imageKey || "",
      fallbackColor: "#1a1a2a",
      glowColor:     "#5ad4f5",
      imageUrl:  newOp.imageKey ? getOperatorImageUrl(newOp.imageKey)  : null,
      avatarUrl: newOp.imageKey ? getOperatorAvatarUrl(newOp.imageKey) : null,
    };
    setOperators((prev) => [...prev, operator]);
    return operator;
  }

  function updateOperator(id, updatedFields) {
    setOperators((prev) =>
      prev.map((op) =>
        op.id === id
          ? {
              ...op,
              ...updatedFields,
              imageUrl:  updatedFields.imageKey ? getOperatorImageUrl(updatedFields.imageKey)  : op.imageUrl,
              avatarUrl: updatedFields.imageKey ? getOperatorAvatarUrl(updatedFields.imageKey) : op.avatarUrl,
            }
          : op
      )
    );
  }

  function deleteOperator(id) {
    setOperators((prev) => prev.filter((op) => op.id !== id));
  }

  function resetOperators() {
    setOperators(INITIAL_OPERATORS);
    localStorage.removeItem("arknights-operators");
  }

  return { operators, filterOperators, addOperator, updateOperator, deleteOperator, resetOperators };
}
