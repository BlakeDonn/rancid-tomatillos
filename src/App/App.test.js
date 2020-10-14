import React from "react";
import App from "./App";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {getAllMovies} from "../api";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("../api.js");

describe("App", () => {
  it("Should load movies on mount", async () => {
    getAllMovies.mockResolvedValueOnce({
      movies: [
        {
          average_rating: 6.8,
          backdrop_path:
            "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
          id: 694919,
          poster_path:
            "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
          release_date: "2020-09-29",
          title: "Money Plane",
        },
      ],
    });
    render(<App />);
    const idea = await waitFor(() => screen.getByText("Money Plane"));
    expect(idea).toBeInTheDocument()
  });
  it("User is redirected to login page on link click", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByRole("link", {name: "Login"}));
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();
  });

  /*userEvent.click(screen.getByRole("link", {name: "Login"}));
  userEvent.type(screen.getByPlaceholderText("email"), "marge@turing.io");
  userEvent.type(screen.getByPlaceholderText("password"), "test");
  userEvent.click(screen.getByRole("button", {name: "Submit"}));*/
});
