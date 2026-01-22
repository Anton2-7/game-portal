import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Games } from "./Games";

// Мок компонента GameList (чтобы не рендерить внутренности)
jest.mock("./GameList", () => ({
    GameList: ({ name }) => <div data-testid="game-card">{name}</div>,
}));

// Мок компонента SearchM
jest.mock("./SearchM", () => ({
    SearchM: ({ onSearch }) => (
        <button onClick={() => onSearch("test")}>Поиск</button>
    ),
}));

describe("Games component", () => {
    test("показывает сообщение, если игр нет", () => {
        render(
            <MemoryRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
                <Games games={[]} searchGames={jest.fn()} />
            </MemoryRouter>
        );

        expect(screen.getByText("Нет игр для отображения")).toBeInTheDocument();
    });

    test("рендерит список карточек GameList", () => {

        const mockGames = [
            { id: 1, name: 'cyberpunk: 2077', released: "2019", rating: "4.5", background_image: "image.jpg" },
            { id: 2, name: 'cyberpunk: 2088', released: "2032", rating: "10", background_image: "image2.jpg" }
        ]
        render(
            <MemoryRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
                <Games games={mockGames} searchGames={jest.fn()} />
            </MemoryRouter>
        );

        const cards = screen.getAllByTestId("game-card");
        expect(cards).toHaveLength(2);
        expect(screen.getByText("cyberpunk: 2077")).toBeInTheDocument();
        expect(screen.getByText("cyberpunk: 2088")).toBeInTheDocument();
    });

    test("проверка input-a SearchM", () => {

        const mockSearch = jest.fn();
        render(
            <MemoryRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
                <Games games={[]} searchGames={mockSearch} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Поиск"));
        expect(mockSearch).toHaveBeenCalledWith("test");
    });
});
