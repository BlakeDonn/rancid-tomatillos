import React from "react";
import MoviePage from "./MoviePage";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {Router, match} from "react-router-dom";
import {getIndividualMovie} from "../api.js";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("../api.js");

describe("MoviePage", () => {
  let match = {params: {id: 337401}, isExact: true, path: "", url: ""};
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
  it("should mount with fetch data", async () => {
    render(
      <MemoryRouter>
        <MoviePage {...match} />
      </MemoryRouter>
    );
    const idea = await waitFor(() => screen.getByText("Runtime: 115 minutes"));
    expect(idea).toBeInTheDocument();
  });
});
