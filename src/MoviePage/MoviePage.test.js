// test click on preview card in app
// test render in MoviePage.test
import React from "react";
import MoviePage from "./MoviePage";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {Route} from 'react-router';
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

describe("MoviePage", () => {
  it("Should show loading screen on click", () => {
    const history = createMemoryHistory();
    history.push("/movie/1")
    render(
      <Router history={history}>
        <Route path="/movie" render={(props) => <MoviePage {...props} />} />
      </Router>
    );
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("Should initiate single movie fetch", () => {
    const history = createMemoryHistory();
    history.push("/movie/1")
    render(
      <Router history={history}>
        <Route path="/movie" render={(props) => <MoviePage {...props} />} />
      </Router>
    );
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("Should in", () => {
    const history = createMemoryHistory();
    history.push("/movie/1")
    render(
      <Router history={history}>
        <Route path="/movie" render={(props) => <MoviePage {...props} />} />
      </Router>
    );
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
