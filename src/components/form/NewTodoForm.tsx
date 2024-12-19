import { useState, FormEvent, ChangeEvent } from "react";

interface NewTodoFormProps {
  onSubmit: (title: string) => void;
}

export function NewTodoForm({ onSubmit }: NewTodoFormProps) {
  const [newItem, setNewItem] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newItem === "") return;

    onSubmit(newItem);

    setNewItem("");
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setNewItem(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">create a new item</label>
        <input
          value={newItem}
          onChange={handleInputChange}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">add</button>
    </form>
  );
}
