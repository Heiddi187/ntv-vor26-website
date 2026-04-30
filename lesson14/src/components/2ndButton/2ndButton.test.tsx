import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import { Button } from "./2ndButton";

describe('Button integration', () => {
    test('Calls onClick when clicked', async () => {
        const handleClick = vi.fn();

        render(
            <Button variant="primary" size="md" onClick={handleClick}>
                Click Me!
            </Button>
        );

        const button = screen.getByRole('button');

        await userEvent.click(button);

        expect(handleClick).toHaveBeenCalled();
    })
})