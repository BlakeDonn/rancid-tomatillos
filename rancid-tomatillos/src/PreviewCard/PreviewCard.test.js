import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PreviewCard from "./PreviewCard";

describe("Card", () => {
  beforeEach(() => {
    const fakeClick = { push: jest.fn(id) }
 
    render(
      <PreviewCard
        average_rating={9}
        backdrop_path="testback"
        id={694919}
        poster_path="testpath"
        release_date="test-date"
        title="Test Title"
        onClick={fakeClick}
      />
    );
  })
  it("should render a card", () => {
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByAltText("poster of Test Title")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
  });

  it("should invoke redirection to movie page with a movie's id", () => {
    userEvent.click(screen.getByRole('button', {id: "9"}));
    expect(fakeClick).toHaveBeenCalled();
  })
});