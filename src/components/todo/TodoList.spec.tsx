import React from "react";
import { render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";

const mockToggleTodo = jest.fn();
const mockDeleteTodo = jest.fn();

const todos = [
  { id: "1", title: "Test Todo 1", completed: false },
  { id: "2", title: "Test Todo 2", completed: true },
  { id: "3", title: "Test Todo 3", completed: false },
];

describe("TodoList", () => {
  test("should render the todo items", () => {
    render(
      <TodoList
        todos={todos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    expect(screen.getByText(/Test Todo 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Todo 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Todo 3/i)).toBeInTheDocument();
  });

  test('should render "No Todos" when there are no todos', () => {
    render(
      <TodoList
        todos={todos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );
    render(
      <TodoList
        todos={[]}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );
    expect(screen.getByText(/No Todos/i)).toBeInTheDocument();
  });

  test("sorts todos by completed status", () => {
    render(
      <TodoList
        todos={todos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );
    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems[0]).toHaveTextContent("Test Todo 1"); // Uncompleted first
    expect(todoItems[1]).toHaveTextContent("Test Todo 3"); // Uncompleted second
    expect(todoItems[2]).toHaveTextContent("Test Todo 2"); // Completed last
  });
});
