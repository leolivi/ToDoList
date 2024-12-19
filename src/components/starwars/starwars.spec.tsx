import { render, screen, waitFor } from "@testing-library/react";
import Starwars from "./starwars";

global.fetch = jest.fn();

const mockCharacters = [
  { name: "Luke Skywalker" },
  { name: "Darth Vader" },
  { name: "Leia Organa" },
];

describe("Starwars Komponente", () => {
  beforeEach(() => {
    mockCharacters.forEach((character) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(character),
      });
    });
  });

  test("should render the starwars characters correctly", async () => {
    render(<Starwars />);

    expect(await screen.findByText("StarWars Charaktere"));
    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
    expect(await screen.findByText("Darth Vader")).toBeInTheDocument();
    expect(await screen.findByText("Leia Organa")).toBeInTheDocument();
  });

  test("should show the correct number of starwars characters", async () => {
    render(<Starwars />);

    await waitFor(() => screen.getByText("Luke Skywalker"));

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3);
  });
});
