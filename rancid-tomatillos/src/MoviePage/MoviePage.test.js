// test click on preview card in app
// test render in MoviePage.test

import React from "react";
import MoviePage from "./MoviePage";

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

describe("MoviePage", () => {
  it("should render more details for one movie", () => {
    render(
      // <PreviewCard
      //   average_rating={9}
      //   backdrop_path="testback"
      //   id={694919}
      //   poster_path="testpath"
      //   release_date="test-date"
      //   title="Test Title"
      // />
      <MoviePage
        average_rating={5}
        backdrop_path="testbackdrop"
        budget="1M"
        genres="comedy"
      />
    );
    screen.debug();
    // expect(screen.getByText("Test Title")).toBeInTheDocument();
    // expect(screen.getByAltText("poster of Test Title")).toBeInTheDocument();
    // expect(screen.getByText("9")).toBeInTheDocument();
  });
});