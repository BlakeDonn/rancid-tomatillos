import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PreviewCard from "./PreviewCard";

describe.skip("Card", () => {
  it.skip("should render a card", () => {
    render(
      <PreviewCard
        average_rating={9}
        backdrop_path="testback"
        id={694919}
        poster_path="testpath"
        release_date="test-date"
        title="Test Title"
      />
    );
    screen.debug();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByAltText("poster of Test Title")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
  });
});
