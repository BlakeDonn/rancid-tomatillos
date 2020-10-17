import React from "react";
import App from "./App";
import {render, screen, waitFor, cleanup} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Router, MemoryRouter } from "react-router-dom";
import {createMemoryHistory} from "history";
import {getAllMovies} from "../api";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("../api.js");

// needs to get called each time you call "getAllMovies" within App 
describe("App", () => {
  beforeEach(() => {
    getAllMovies.mockResolvedValue({
      movies: [
        {
          average_rating: 6.8,
          backdrop_path:
            "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
          id: 694919,
          poster_path:
            "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
          release_date: "2020-09-29",
          title: "Money Plane",
        },
      ],
    });
  })
  
  describe("Header", () => {
  //afterEach(cleanup) cleans DOM - not stubs created using data "retrieved" from jest.mock
  
    it("Should have a header with links", () => {
      render (
      <MemoryRouter>
        <App />
      </MemoryRouter>
      )
  
      expect(screen.getByText('Rotten Tomatillos')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByRole('link', {name: /Login/})).toBeInTheDocument();
    })
  })
  
  describe("Dashboard", () => {
  
    it("Should load movies on mount", async () => {
      render(<App />);
      const idea = await waitFor(() => screen.getByText("Money Plane"));
      expect(idea).toBeInTheDocument()
    });
  
    it("User is redirected to login page on link click", async () => {
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <App />
        </Router>    
      );
      userEvent.click(screen.getByRole("link", {name: "Login"}));
      expect(screen.getByText(/login/i)).toBeInTheDocument();
      expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();
    });
  
    /*userEvent.click(screen.getByRole("link", {name: "Login"}));
    userEvent.type(screen.getByPlaceholderText("email"), "marge@turing.io");
    userEvent.type(screen.getByPlaceholderText("password"), "test");
    userEvent.click(screen.getByRole("button", {name: "Submit"}));*/
  });
})



