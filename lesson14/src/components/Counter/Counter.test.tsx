import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { Counter } from "./Counter";

describe("Counter integration", () => {
  test("increments when clicking 'Hækka'", async () => {
    render(<Counter />);

    const button = screen.getByRole("button", { name: "Hækka" });

    await userEvent.click(button);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("decrements when clicking 'Minnka'", async () => {
    render(<Counter />);

    const counter = screen.getAllByRole('region', { name: 'Teljari' })[0];
    const utils = within(counter);

    const button = utils.getByRole("button", { name: "Minnka" });

    await userEvent.click(button);

    expect(utils.getByText("-1")).toBeInTheDocument();
  });

  test("resets to 0 when clicking 'Endurstilla'", async () => {
    render(<Counter />);

    const counter = screen.getAllByRole('region', { name: 'Teljari' })[0];
    const utils = within(counter);

    const increase = utils.getByRole("button", { name: "Hækka" });
    const reset = utils.getByRole("button", { name: "Endurstilla" });

    await userEvent.click(increase);
    await userEvent.click(increase);

    expect(utils.getByText("2")).toBeInTheDocument();

    await userEvent.click(reset);

    expect(utils.getByText("0")).toBeInTheDocument();
  });
});