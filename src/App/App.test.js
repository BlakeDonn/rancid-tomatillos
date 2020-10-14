import React from "react";
import App from "./App";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {postUserLogin} from "../api";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("../api.js");

describe("App", () => {
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
    postUserLogin.mockReturnValue({
      user: {id: 23, name: "testy", email: "t@esty"},
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
