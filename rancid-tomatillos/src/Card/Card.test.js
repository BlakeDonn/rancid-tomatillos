import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PreviewCard from "./PreviewCard";

describe("Card", () => {
    it("should render a card", () => {
        render(
            <PreviewCard
                id={3}
                poster_path="fake-url"
                title="Star Wars"
                average_rating={6}
            />
        );
        expect(
            screen.getByText("Star Wars")
        ).toBeInTheDocument();
        expect(screen.getByText("6")).toBeInTheDocument();
    });
});
