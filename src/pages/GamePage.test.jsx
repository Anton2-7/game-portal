import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { GamePage } from "./GamePage";


// Фейковые данные игры
const mockGame = {
  id: 1,
  name: "Cyberpunk 2077",
  background_image: "image.jpg",
  developers: [{ id: 1, name: "CD Projekt" }],
  ratings: [{ title: "exceptional", count: 100, percent: 80 }],
  tags: [{ id: 1, name: "RPG" }],
  website: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
  released: "2020-12-10",
  rating: 4.5,
  metacritic: 90,
  platforms: [{ platform: { name: "PC" } }],
  genres: [{ name: "Action" }],
  description_raw: "Game description",
};

function renderWithRouter() {
  return render(
    <MemoryRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
      initialEntries={["/game/1"]}>
      <Routes>
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.restoreAllMocks();
});


test("карточка конкретной игры", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockGame),
    })
  );

  renderWithRouter();

  expect(await screen.findByText("Cyberpunk 2077")).toBeInTheDocument();
  expect(screen.getByText("CD Projekt")).toBeInTheDocument();
  expect(screen.getByText("RPG")).toBeInTheDocument();
  expect(screen.getByText(/PC/)).toBeInTheDocument();
});

test("ошибка загрузки", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      status: 500,
    })
  );

  renderWithRouter();

  expect(await screen.findByText(/Ошибка:/)).toBeInTheDocument();
});
