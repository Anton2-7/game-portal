import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchM } from "./SearchM";


describe("SearchM component", () => {
    test("проверка поиска SearchM", () => {
        const mockSearch = jest.fn();

        render(
            <MemoryRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
                <SearchM onSearch={mockSearch} />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText("Поиск");

        fireEvent.change(input, { target: { value: "cyberpunk" } });
        expect(input.value).toBe("cyberpunk");

        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
        expect(mockSearch).toHaveBeenCalledWith("cyberpunk");
    });

    test("проверка кнопки сброса SearchM", () => {
        const mockSearch = jest.fn();

        render(
            <MemoryRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
                <SearchM onSearch={mockSearch} />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText("Поиск");
        const clearButton = screen.getByText("Сброс");

        fireEvent.click(clearButton);
        expect(input.value).toBe("");
    });
})