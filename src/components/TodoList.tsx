import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
    if (todos.length === 0) {
        return <p className='text-center text-gray-500'>Нет задач</p>;
    }

    return (
        <ul className='space-y-2'>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}
