import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "./TodoItem";

const mockToggleTodo = jest.fn();
const mockDeleteTodo = jest.fn();

const todoTest = {
  id: "1",
  title: "Test Todo",
  completed: false,
  toggleTodo: mockToggleTodo,
  deleteTodo: mockDeleteTodo,
};

describe("TodoItem", () => {
  test("should render the todo item with title and checkbox", () => {
    render(<TodoItem {...todoTest} />);
    expect(screen.getByLabelText(/Test Todo/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  test("checkbox should be unchecked by default", () => {
    render(<TodoItem {...todoTest} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("should call toggleTodo when checkbox is clicked", () => {
    render(<TodoItem {...todoTest} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockToggleTodo).toHaveBeenCalledWith("1", true);
  });

  test("should call deleteTodo when delete button is clicked", () => {
    render(<TodoItem {...todoTest} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockDeleteTodo).toHaveBeenCalledWith("1");
  });
});
