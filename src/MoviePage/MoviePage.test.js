// test click on preview card in app
// test render in MoviePage.test
import React from "react";
import MoviePage from "./MoviePage";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Router} from "react-router-dom";
import {createMemoryHistory, createLocation} from "history";
import {match, Route} from 'react-router';
import {MemoryRouter} from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

describe("MoviePage", () => {
  it("Shoul show loading screen on click", () => {
    const history = createMemoryHistory();
    history.push("/movie/1")
    render(
      <Router history={history}>
        <Route path="/movie" render={(props) => <MoviePage {...props} />} />
      </Router>
    );
    screen.debug()
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    // expect(screen.getByAltText("poster of Test Title")).toBeInTheDocument();
    // expect(screen.getByText("9")).toBeInTheDocument();
  });
});
