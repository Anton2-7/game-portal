import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PlatformCards } from "./PlatformCards";

// Мок fetch: возвращает данные в зависимости от URL
const mockFetch = (url) => {
    if (url.includes("/platforms")) {
        return Promise.resolve({
            ok: true,
            json: async () => ({
                results: [
                    { id: 4, name: "PC", image_background: "pc.jpg", games_count: 100 },
                    { id: 187, name: "PS5", image_background: "ps5.jpg", games_count: 80 },
                ],
                count: 2,
            }),
        });
    }

    if (url.includes("/games")) {
        return Promise.resolve({
            ok: true,
            json: async () => ({
                results: [
                    { id: 101, name: "Cyberpunk 2077", background_image: "cp.jpg" },
                    { id: 102, name: "The Witcher 3", background_image: "tw3.jpg" },
                ],
                count: 2,
            }),
        });
    }

    return Promise.reject(new Error("Unknown URL"));
};

describe("PlatformCards component", () => {
    beforeEach(() => {
        global.fetch = jest.fn(mockFetch);
    });

    afterEach(() => {
        global.fetch.mockClear();
        cleanup();
    });

    test("загрузка и отображение списка платформ по умолчанию", async () => {
        render(
            <MemoryRouter>
                <PlatformCards />
            </MemoryRouter>
        );

        expect(await screen.findByText("PC")).toBeInTheDocument();
        expect(await screen.findByText("PS5")).toBeInTheDocument();
        expect(await screen.findByText("Всего игр: 80")).toBeInTheDocument();
    });

    test("загружает игры при выборе платформы через URL", async () => {
        render(
            <MemoryRouter initialEntries={["/?platform=4&page=1"]}>
                <PlatformCards />
            </MemoryRouter>
        );

        expect(await screen.findByText("Cyberpunk 2077")).toBeInTheDocument();
        expect(await screen.findByText("The Witcher 3")).toBeInTheDocument();
    });

    test("сбрасывает фильтр и возвращает к списку платформ", async () => {
        // Рендер с выбранной платформой
        render(
            <MemoryRouter initialEntries={["/?platform=4&page=1"]}>
                <PlatformCards />
            </MemoryRouter>
        );

        expect(await screen.findByText("Cyberpunk 2077")).toBeInTheDocument();

        // Полный сброс DOM
        cleanup();

        // Рендер без параметров
        render(
            <MemoryRouter initialEntries={["/"]}>
                <PlatformCards />
            </MemoryRouter>
        );

        expect(await screen.findByText("PC")).toBeInTheDocument();
        expect(await screen.findByText("PS5")).toBeInTheDocument();
        expect(screen.queryByText("Cyberpunk 2077")).not.toBeInTheDocument();
    });

    test("отображает SkeletonCard при загрузке платформ", () => {
        // fetch зависает
        const pendingPromise = new Promise(() => { });
        global.fetch = jest.fn(() => pendingPromise);

        render(
            <MemoryRouter>
                <PlatformCards />
            </MemoryRouter>
        );

        // В SkeletonCard должен быть data-testid="skeleton-card"
        const skeletons = screen.getAllByTestId("skeleton-card");
        expect(skeletons.length).toBe(12);
    });
});
