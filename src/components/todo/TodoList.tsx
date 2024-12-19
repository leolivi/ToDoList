import { Todo } from "@/app/page";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}

export function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
  const sortedTodos = [...todos].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {sortedTodos.map((todo) => (
        <TodoItem
          {...todo}
          key={todo.id}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
