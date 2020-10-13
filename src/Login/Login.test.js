import React from "react";
import Login from "./Login.js";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {getIdeas} from '../api';
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

jest.mock('../api.js');

describe("Login", () => {
  it("should render more details for one movie", () => {
    render(
      <Login />
    );
    expect(screen.getByText("Enter User Details")).toBeInTheDocument();
    // expect(screen.getByAltText("poster of Test Title")).toBeInTheDocument();
    // expect(screen.getByText("9")).toBeInTheDocument();
  });
});
