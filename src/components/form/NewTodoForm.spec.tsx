import { render, screen, fireEvent } from "@testing-library/react";
import { NewTodoForm } from "./NewTodoForm";

describe("NewTodoForm", () => {
  test("should render correctly", () => {
    render(<NewTodoForm onSubmit={jest.fn()} />);

    const input = screen.getByLabelText(
      /create a new item/i
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /add/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("should call onSubmit when the form is submitted", () => {
    const handleSubmit = jest.fn();
    render(<NewTodoForm onSubmit={handleSubmit} />);

    const input = screen.getByLabelText(
      /create a new item/i
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "New Todo" } });
    expect(input.value).toBe("New Todo");

    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledWith("New Todo");
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("should not call onSubmit if the input is empty", () => {
    const handleSubmit = jest.fn();
    render(<NewTodoForm onSubmit={handleSubmit} />);

    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.click(button);

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test("should clear the input after submit", () => {
    const handleSubmit = jest.fn();
    render(<NewTodoForm onSubmit={handleSubmit} />);

    const input = screen.getByLabelText(
      /create a new item/i
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(input.value).toBe("");
  });
});
