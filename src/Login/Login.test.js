import React from "react";
import Login from "./Login.js";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {postUserLogin} from "../api";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("../api.js");

describe("Login", () => {
  it("Should render with inputs and submit button", () => {
    render(<Login />);
    expect(screen.getByText("Enter User Details")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument(
      "test"
    );
  });
  it("Should reflect bad login", async () => {
    postUserLogin.mockReturnValue({
      error: "Username or password is incorrect",
    });
    render(<Login />);
    userEvent.type(screen.getByPlaceholderText("email"), "bad");
    userEvent.type(screen.getByPlaceholderText("password"), "info");
    userEvent.click(screen.getByRole("button", {name: "Submit"}));
    expect(await screen.findByText(/Incorrect/i)).toBeInTheDocument();
  });
});
