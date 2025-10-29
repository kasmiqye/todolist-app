import { useState } from "react";

interface TodoFormProps {
    onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите задачу..."
                className="flex-1 border rounded p-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Добавить
            </button>
        </form>
    );
}