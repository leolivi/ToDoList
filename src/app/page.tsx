"use client";
import { useEffect, useMemo, useState } from "react";
import { TodoList } from "../components/todo/TodoList";
import { NewTodoForm } from "@/components/form/NewTodoForm";
import Starwars from "@/components/starwars/starwars";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title: string) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id: string, completed: boolean) {
    setTimeout(() => {
      setTodos((currentTodos) => {
        return currentTodos.map((todo) => {
          if (todo.id === id) {
            todo.completed = completed;
          }
          return todo;
        });
      });
    }, 1000);
  }

  function deleteTodo(id: string) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  const countOpenTodos = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">To-Do List</h1>
      <div className="todo-counter">Offene To-dos: {countOpenTodos}</div>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <Starwars />
    </>
  );
}
