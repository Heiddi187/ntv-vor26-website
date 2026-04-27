// use mock to test because we don't have the api key
import { render, screen, waitFor } from "@testing-library/react";
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

it("should disable button while loading", async () => {
   vi.spyOn(quotesApi, "fetchRandomQuote").mockImplementation(
      () =>
         new Promise((resolve) => setTimeout(() => resolve("test quote"), 100)),
   );

   const user = userEvent.setup();
   render(<QuoteCard />);

   const button = screen.getByRole("button", { name: "Sækja quote" });
   await user.click(button);

   expect(button).toBeDisabled();
   //expect(await screen.findByRole('button')).toBeDisabled();
});

it("should display quote when API call succeeds", async () => {
   vi.spyOn(quotesApi, "fetchRandomQuote").mockResolvedValue("hello");

   const user = userEvent.setup();
   render(<QuoteCard />);

   await user.click(screen.getByRole("button", { name: "Sækja quote" }));

   expect(await screen.findByRole("status")).toHaveTextContent("hello");
});

it("should hide loading state after successful fetch", async () => {
   vi.spyOn(quotesApi, "fetchRandomQuote").mockImplementation(
      () =>
         new Promise((resolve) => setTimeout(() => resolve("test quote"), 100)),
   );

   const user = userEvent.setup();
   render(<QuoteCard />);

   const button = screen.getByRole("button", { name: "Sækja quote" });
   await user.click(button);

   expect(button).toHaveTextContent('Sæki…');
   await screen.findByText('test quote');
   expect(button).toHaveTextContent('Sækja quote');
});

it("should display error message when API call fails", async () => {
   vi.spyOn(quotesApi, "fetchRandomQuote").mockRejectedValue(new Error());

   const user = userEvent.setup();
   render(<QuoteCard />);

   await user.click(screen.getByRole("button", { name: "Sækja quote" }));
   
   expect (await screen.findByRole('alert')).toBeInTheDocument();
});

it("should hide loading state after failed fetch", async () => {
   vi.spyOn(quotesApi, "fetchRandomQuote").mockRejectedValue(new Error());

   const user = userEvent.setup();
   render(<QuoteCard />);

   const button = screen.getByRole("button", { name: "Sækja quote" });
   await user.click(button);

   expect(await screen.findByRole('alert')).toBeInTheDocument();
   
   //expect(button).toHaveTextContent('Sækja quote');   -- betra að nota waitFor
   await waitFor(() => {
      expect(button).toHaveTextContent('Sækja quote')
   })
});

it("should clear previous quote when fetching a new one", async () => {
   vi.spyOn(quotesApi, "fetchRandomQuote")
      .mockResolvedValueOnce("hello")
      .mockResolvedValueOnce("welcome");

   const user = userEvent.setup();
   render(<QuoteCard />);

   const button = screen.getByRole('button', { name: 'Sækja quote' });

   await user.click(button);
   expect(await screen.findByText('hello')).toBeInTheDocument();

   await user.click(button);
   expect(screen.queryByText('hello')).not.toBeInTheDocument();
   expect(await screen.findByText('welcome')).toBeInTheDocument();

   // þetta er ekki nógu gott...
   // await user.click(screen.getByRole("button", { name: "Sækja quote" }));

   // vi.spyOn(quotesApi, "fetchRandomQuote")
   // await user.click(screen.getByRole("button", { name: "Sækja quote" }));
   // expect(await screen.findByRole("status")).not.toHaveTextContent("hello");
   // expect(await screen.findByRole("status")).toHaveTextContent("welcome");
});
