import React from "react";
import MoviePage from "./MoviePage";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {getIndividualMovie, getMovieComments} from "../api.js";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("../api.js");

describe("MoviePage", () => {
  
  beforeEach(() => {
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
            "author": "iluvmoviezzz",
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
  })
  
  it("should mount with fetched data from movie and comment api's", async () => {
    const match = {params: {id: 337401}, isExact: true, path: "", url: ""};
    render(
      <MemoryRouter>
        <MoviePage {...match} />
      </MemoryRouter>
    );
    const movieRuntime = await waitFor(() => screen.getByText("Runtime: 115 minutes"));
    const user1 = screen.getByText("trollsfan4ever says:");
    const comment1 = screen.getByText("\"no thankyou\"")
    expect(movieRuntime).toBeInTheDocument();
    expect(user1).toBeInTheDocument();
    expect(comment1).toBeInTheDocument();
  });
});
