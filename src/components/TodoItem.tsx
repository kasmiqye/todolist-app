import React, { useState } from 'react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    
    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = editText.trim();
        if (trimmed) {
            onEdit(todo.id, trimmed);
            setIsEditing(false);
        }
    };

    return (
        <li className='flex justify-between items-center border-b py-2'>
            {isEditing ? (
                <form onSubmit={handleEditSubmit} className='flex-1 mr-2 flex gap-2'>
                    <input
                        type='text'
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        className='w-full border px-2 py-1 rounded'
                        autoFocus
                    />
                    <button
                        type='submit'
                        className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'>
                            Сохранить
                    </button>
                    <button
                        type='button'
                        onClick={() => setIsEditing(false)}
                        className='bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500'>
                            Отмена
                    </button>
                </form>
            ) : (
                <>
                    <label className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)} />
                        <span
                            className={todo.completed ? 'line-through text-gray-400' : ''}>
                                {todo.text}
                        </span>
                    </label>
                    <div className='flex gap-2 ml-2'>
                        <button
                            onClick={() => setIsEditing(true)}
                            className='text-blue-500 hover:text-blue-700'>
                                Редактировать
                            </button>
                         <button
                            onClick={() => onDelete(todo.id)} className='bg-red-500 hover:bg-red-600 px-2 py-1 rounded'>
                                Удалить
                    </button>
                    </div>
                   
                </>
            )}
        </li>
    );
}