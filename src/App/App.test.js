import React from "react";
import App from "./App";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { getAllMovies, getIndividualMovie, postUserLogin, getUserRatings } from "../api";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("../api.js");

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

    getIndividualMovie.mockResolvedValue(
      { "movie": {
        "id": 694919,
        "title": "Money Plane",
        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
        "release_date": "2020-09-29",
        "overview": "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
        "genres": [
          "Action"
        ],
        "budget": 0,
        "revenue": 0,
        "runtime": 82,
        "tagline": "",
        "average_rating": 4.75
      } }
    )
  })
  
  describe("Header", () => {
    
    it("Should have a header with links", () => {
      render (
      <MemoryRouter>
        <App />
      </MemoryRouter>
      )
      
      expect(screen.getByText('Rotten Tomatillos')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();

      const loginLink = screen.getByRole('link', {name: /login/i})
      expect(loginLink).toBeInTheDocument();
      expect(loginLink.href).toMatch(/login/i);

    })
  })
  
  describe("Dashboard", () => {
    
    it("Should load movies on mount", async () => {
      render(
      <MemoryRouter>
        <App />
      </MemoryRouter>);
      const movieTitle = await waitFor(() => screen.getByText("Money Plane"));
      expect(movieTitle).toBeInTheDocument()
    });
  
    // if you can't isolate history to individual it block-- history from past test can leak into the next test 
    // memoryrouter encapsulates history of environment
    it("User is redirected to login page on link click", async () => {

      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>    
      );

      userEvent.click(screen.getByRole("link", {name: "Login"}));
      expect(screen.getByText(/login/i)).toBeInTheDocument();
      expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();
    });
    //when you put router inside of a component - makes it harder to test
    //right now history is leaking from test above - starting at login page instead of home page
    //quick fix: 
    //best practice take out router in app component + make sure render app in test -> wrapped in <Router history={history}
    it("Should route to a page with more movie details", async () => {

      render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
      );
      const movieTitle = await waitFor(() => screen.getByAltText("poster of Money Plane"));
      expect(movieTitle).toBeInTheDocument()
      userEvent.click(screen.getByRole('link', {name: /money plane/i}))
      await waitFor(() => expect(screen.getByText("Runtime: 82 minutes")).toBeInTheDocument())
    })
    it("Should display custom dashboard and have option to rate a movie if a user is logged in", async () => {
      postUserLogin.mockResolvedValue(
        {
          "user": {
            "email": "marge@turing.io",
            "id": 84,
            "name": "Marge"
          }
        }
      )

      getUserRatings.mockResolvedValue(
        { "ratings": 
          [
            {
              "id": 2743,
              "user_id": 84,
              "movie_id": 585244,
              "rating": 3,
              "created_at": "2020-10-15T00:41:26.504Z",
              "updated_at": "2020-10-15T00:41:26.504Z"
            },
            {
              "id": 2747,
              "user_id": 84,
              "movie_id": 413518,
              "rating": 4,
              "created_at": "2020-10-15T01:28:13.417Z",
              "updated_at": "2020-10-15T01:28:13.417Z"
            },
            {
              "id": 2749,
              "user_id": 84,
              "movie_id": 550231,
              "rating": 4,
              "created_at": "2020-10-15T01:37:34.555Z",
              "updated_at": "2020-10-15T01:37:34.555Z"
            }
          ]
        }
      )

      render (
        <MemoryRouter>
          <App />
        </MemoryRouter>
       )
       userEvent.click(screen.getByRole("link", {name: "Login"}));
       userEvent.type(screen.getByPlaceholderText("email"), "marge@turing.io");
       userEvent.type(screen.getByPlaceholderText("password"), "password123");
       userEvent.click(screen.getByRole("button", {name: "Submit"}));
       await waitFor(() => screen.debug())
    })

  });
})



