import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/Button";

describe("Button Component", () => {
    it("renders text correctly", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("shows loading spinner and disables button when isLoading is true", () => {
        render(<Button isLoading>Submit</Button>);

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();

    });

    it('renders as a Link when "to" prop is provided', () => {
        render(
            <BrowserRouter>
                <Button to="/home">Go Home</Button>
            </BrowserRouter>,
        );

        const link = screen.getByRole("link", { name: /go home/i });
        expect(link).toHaveAttribute("href", "/home");
    });
});
