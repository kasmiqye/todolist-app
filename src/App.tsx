import { useState, useEffect } from 'react';
import type { Todo } from './types/todo';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  return (
      <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
        <h1 className='text-2xl font-bold text-center mb-4'>Список задач</h1>

        <TodoForm onAdd={addTodo} />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo}/>

        <div className='flex  justify-center gap-3 mt-4'>
          <button
            onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Все
          </button>
          <button
            onClick={() => setFilter('active')} className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              Активные
            </button>
            <button
              onClick={() => setFilter('completed')} className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                Выполненные
              </button>
        </div>

        <p className='text-center text-sm text-gray-500 mt-3'>
          Осталось {todos.filter(t => !t.completed).length} задач
        </p>
      </div>
  );
}

export default App
