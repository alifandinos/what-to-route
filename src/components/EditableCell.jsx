import { useState } from "react";

export default function EditableCell({ value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = () => {
    const trimmed = draft.trim();
    onSave(trimmed === "" ? value : trimmed); // jangan biarkan nama kosong
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        autoFocus
        className="w-full bg-white border border-blue-400 rounded px-2 py-1 text-sm"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
        }}
      />
    );
  }

  return (
    <span
      onDoubleClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      className="cursor-pointer hover:bg-blue-50 rounded px-2 py-1 inline-block"
      title="Double-click untuk edit"
    >
      {value}
    </span>
  );
}