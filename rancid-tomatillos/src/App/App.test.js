import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

describe.only("App", () => {
    test("User is redirected to login page on link click", () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <App />
            </Router>
        );
        userEvent.click(screen.getByRole("link", {name: "Login"}));
        expect(screen.getByText(/login/i)).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "Enter User Details"})).toBeInTheDocument()
    });
    test.only("User can log in", () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <App />
            </Router>
        );
        userEvent.click(screen.getByRole("link", {name: "Login"}));
        userEvent.type(screen.getByPlaceholderText("email"), "testtext");
        expect(screen.getByPlaceholderText('email')).toHaveValue('testtext')
    });
});
