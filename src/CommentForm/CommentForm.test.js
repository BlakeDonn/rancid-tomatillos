import React from "react";
import Login from "./Login.js";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {postUserComment} from "../api";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("../api.js");