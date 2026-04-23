// use mock to test because we don't have the api key
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, it, expect } from "vitest";
import { QuoteCard } from "./QuoteCard";
import * as quotesApi from "../lib/quotes";

it("should render fetch button initially", async () => {
   render(<QuoteCard />);

   const button = screen.getByRole("button", { name: "Sækja quote" });

   expect(button).toBeInTheDocument();
});

it("should not show quote or error initially", async () => {
   render(<QuoteCard />);

   expect(screen.queryByRole("status")).not.toBeInTheDocument();
   expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

it("should show loading state when button is clicked", async () => {
   vi.spyOn(quotesApi, "fetchRandomQuote").mockImplementation(
      () =>
         new Promise((resolve) => setTimeout(() => resolve("test quote"), 100)),
   );

   const user = userEvent.setup();
   render(<QuoteCard />);

   const button = screen.getByRole("button", { name: "Sækja quote" });
   await user.click(button);

   expect(screen.getByRole("button")).toHaveTextContent("Sæki…");
});

it.todo("should disable button while loading", async () => {});

it("should display quote when API call succeeds", async () => {
   vi.spyOn(quotesApi, "fetchRandomQuote").mockResolvedValue("hello");

   const user = userEvent.setup();
   render(<QuoteCard />);

   await user.click(screen.getByRole("button", { name: "Sækja quote" }));

   expect(await screen.findByRole("status")).toHaveTextContent("hello");
});

it.todo("should hide loading state after successful fetch", async () => {});

it("should display error message when API call fails", async () => {
   vi.spyOn(quotesApi, "fetchRandomQuote").mockRejectedValue(new Error());

   const user = userEvent.setup();
   render(<QuoteCard />);

   await user.click(screen.getByRole("button", { name: "Sækja quote" }));
   
   expect (await screen.findByRole('alert')).toBeInTheDocument();
});

it.todo("should hide loading state after failed fetch", async () => {});

it.todo("should clear previous quote when fetching a new one", async () => {});
