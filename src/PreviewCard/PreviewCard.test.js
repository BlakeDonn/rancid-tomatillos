import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import PreviewCard from "./PreviewCard";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

describe("Card", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PreviewCard
          average_rating={9}
          backdrop_path="testback"
          id={694919}
          poster_path="testpath"
          release_date="test-date"
          title="Test Title"
          favoriteMovies={[1234]}
        />
      </MemoryRouter>
    );
  });
  it("should render a card", () => {
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByAltText("poster of Test Title")).toBeInTheDocument();
    expect(screen.getByText("Average Rating: 9")).toBeInTheDocument();
  });

});
