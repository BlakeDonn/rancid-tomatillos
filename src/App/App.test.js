import React from "react";
import App from "./App";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {getAllMovies, postUserLogin} from "../api";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("../api.js");

describe("App", () => {
  test("General dashboard should load by default", () => {
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

  test("User is redirected to login page on link click", () => {
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
  test("User can log in", async () => {
    getAllMovies.mockResolvedValueOnce({
      average_rating: 6.8,
      backdrop_path:
        "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
      id: 694919,
      poster_path:
        "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
      release_date: "2020-09-29",
      title: "Money Plane",
    });
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByRole("link", {name: "Login"}));
    userEvent.type(screen.getByPlaceholderText("email"), "marge@turing.io");
    userEvent.type(screen.getByPlaceholderText("password"), "test");
    userEvent.click(screen.getByRole("button", {name: "Submit"}));
    expect(await screen.findByText(/Incorrect/i)).toBeInTheDocument();
  });
});
