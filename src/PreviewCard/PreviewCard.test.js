import React from "react";
import {render, screen} from "@testing-library/react";
import {Router, MemoryRouter} from "react-router-dom";
import {history} from "history";
import {createMemoryHistory} from "history";
import userEvent from "@testing-library/user-event";
import PreviewCard from "./PreviewCard";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

describe("Card", () => {
  const fakeClick = jest.fn();
  const historyMock = {push: fakeClick};
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <PreviewCard
          average_rating={9}
          backdrop_path="testback"
          id={694919}
          poster_path="testpath"
          release_date="test-date"
          title="Test Title"
          history={history}
        />
      </Router>
    );
  });
  it("should render a card", () => {
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByAltText("poster of Test Title")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
  });

  it("should call history push on click", () => {
    expect(screen.getByRole("button", {id: "9"}));
    userEvent.click(screen.getByRole("button", {id: "9"}));
    expect(fakeClick).toHaveBeenCalledTimes(1)
  });

});
