// test click on preview card in app
// test render in MoviePage.test
import React from "react";
import {createMemoryHistory} from "history";
import MoviePage from "./MoviePage";
import {render, screen, waitFor} from "@testing-library/react";
import {Route} from "react-router";
import {Router} from "react-router-dom";
import {getIndividualMovie} from "../api.js";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("../api.js");

describe("MoviePage", () => {
  it("Should show loading screen on click", async () => {
    const history = createMemoryHistory();
    history.push("/movie/1");
    render(
      <Router history={history}>
        <Route path="/movie" render={(props) => <MoviePage {...props} />} />
      </Router>
    );
    expect(screen.getByText("Loading")).toBeInTheDocument()
  });

  it("Should initiate single movie fetch", async () => {
    const mockedResponse = getIndividualMovie.mockResolvedValueOnce([
      mockedMovie,
    ]);
    history.push("/movie/1");
    render(
      <Router history={history}>
        <Route path="/movie" render={(props) => <MoviePage {...props} />} />
      </Router>
    );

  });
});
