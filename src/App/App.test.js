import React from "react";
import App from "./App";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { getAllMovies, getIndividualMovie, postUserLogin, getUserRatings, getMovieComments, getFavoriteMovies } from "../api";
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
        {
          "id": 337401,
          "poster_path": "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//zzWGRw277MNoCs3zhyG3YmYQsXv.jpg",
          "title": "Mulan",
          "average_rating": 5.666666666666667,
          "release_date": "2020-09-04"
        }
      ]
    });

    getIndividualMovie.mockResolvedValue({
      movie: {
        id: 694919,
        title: "Money Plane",
        poster_path:
          "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
        release_date: "2020-09-29",
        overview:
          "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
        genres: ["Action"],
        budget: 0,
        revenue: 0,
        runtime: 82,
        tagline: "",
        average_rating: 4.75,
      },
    });
  });

  describe("Header", () => {
    it("Should have a header with links", () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByText("Rancid Tomatillos")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();

      const loginLink = screen.getByRole("link", {name: /login/i});
      expect(loginLink).toBeInTheDocument();
      expect(loginLink.href).toMatch(/login/i);
    });
  });

  describe("Dashboard", () => {
    it("Should load movies on mount", async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      const movieTitle = await waitFor(() => screen.getByText("Money Plane"));
      expect(movieTitle).toBeInTheDocument();
    });
    it("User is redirected to login page on link click", async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      userEvent.click(screen.getByRole("link", {name: "Login"}));
      expect(screen.getByText(/login/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", {name: "Submit"})
      ).toBeInTheDocument();
    });
    it("Should route to a page with more movie details", async () => {
      getMovieComments.mockResolvedValue(
        {
          "comments": [
            {
              "comment": "lalalalala",
              "author": "iluvmoviezzz",
              "movieId": 337401,
              "id": 1603224854153
            },
            {
              "comment": "no thankyou",
              "author": "Marge",
              "movieId": 337401,
              "id": 1603224859706
            },
            {
              "comment": "best movie ever",
              "author": "trollsfan4ever",
              "movieId": 337401,
              "id": 1603224918563
            }
          ]
        }
      )

      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      const movieTitle = await waitFor(() =>
        screen.getByAltText("poster of Money Plane")
      );
      expect(movieTitle).toBeInTheDocument();
      userEvent.click(
        screen.getByRole("link", {name: "Click for details on Money Plane"})
      );
      await waitFor(() =>
        expect(screen.getByText("Runtime: 82 minutes")).toBeInTheDocument()
      );
    });
    it("Should display custom dashboard features to favorite and rate movies if a user is logged in", async () => {
      postUserLogin.mockResolvedValue({
        user: {
          email: "marge@turing.io",
          id: 84,
          name: "Marge",
        },
      });

      getFavoriteMovies.mockResolvedValue([694919]);

      getUserRatings.mockResolvedValue({
        ratings: [
          {
            id: 2743,
            user_id: 84,
            movie_id: 694919,
            rating: 3,
            created_at: "2020-10-15T00:41:26.504Z",
            updated_at: "2020-10-15T00:41:26.504Z",
          },
          {
            id: 2747,
            user_id: 84,
            movie_id: 413518,
            rating: 4,
            created_at: "2020-10-15T01:28:13.417Z",
            updated_at: "2020-10-15T01:28:13.417Z",
          },
          {
            id: 2749,
            user_id: 84,
            movie_id: 550231,
            rating: 4,
            created_at: "2020-10-15T01:37:34.555Z",
            updated_at: "2020-10-15T01:37:34.555Z",
          },
        ],
      });

      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
       )
       userEvent.click(screen.getByRole("link", {name: "Login"}));
       userEvent.type(screen.getByPlaceholderText("email"), "marge@turing.io");
       userEvent.type(screen.getByPlaceholderText("password"), "password123");
       userEvent.click(screen.getByRole("button", {name: "Submit"}));
       await waitFor(() => expect(screen.getByText("Logout")).toBeInTheDocument())
       expect(screen.getByText("your rating: 3")).toBeInTheDocument()
       expect(screen.getByText("tomato.svg")).toBeInTheDocument()
    })
    it("should display a movie page with comment form if a user is logged in", async () => {
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
              "movie_id": 694919,
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
      getIndividualMovie.mockResolvedValueOnce(
        {
          movie:
          {
            average_rating: 3,
            backdrop_path:
              "https://image.tmdb.org/t/p/original//zzWGRw277MNoCs3zhyG3YmYQsXv.jpg",
            budget: 200000000,
            genres: ["Action", "Adventure", "Drama", "Fantasy"],
            id: 337401,
            overview:
              "When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.",
            poster_path:
              "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
            release_date: "2020-09-04",
            revenue: 57000000,
            runtime: 115,
            tagline: "",
            title: "Mulan",
          },
        });
      getMovieComments.mockResolvedValue(
        {
          "comments": [
            {
              "comment": "lalalalala",
              "author": "iluvmoviezzz",
              "movieId": 337401,
              "id": 1603224854153
            },
            {
              "comment": "no thankyou",
              "author": "Marge",
              "movieId": 337401,
              "id": 1603224859706
            },
            {
              "comment": "best movie ever",
              "author": "trollsfan4ever",
              "movieId": 337401,
              "id": 1603224918563
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
      await waitFor(() => expect(screen.getByText("Logout")).toBeInTheDocument())
       
      const movieTitle = screen.getByAltText("poster of Mulan");
      expect(movieTitle).toBeInTheDocument()

      userEvent.click(screen.getByRole('link', {name: /mulan/i}))
      await waitFor(() => screen.debug())
      const mulanRuntime = screen.getByText("Runtime: 115 minutes")
      const commentPlaceholder = screen.getByPlaceholderText("Your thoughts")
      const userComment = screen.getByText("Marge says:")
      expect(mulanRuntime).toBeInTheDocument();
      expect(commentPlaceholder).toBeInTheDocument()
      expect(userComment).toBeInTheDocument()
    })
  });
});
