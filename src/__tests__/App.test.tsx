import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import App from "@/App";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const renderApp = (initialRoute = "/") => {
    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            <AuthProvider>
                <LanguageProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </LanguageProvider>
            </AuthProvider>
        </MemoryRouter>,
    );
};

describe("App Integration & Routing", () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it("redirects unauthenticated user to Login page when trying to access Home", async () => {
        renderApp("/");

        expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
        expect(screen.getByText(/Email/i)).toBeInTheDocument();

        expect(screen.queryByText(/Decision Maker/i)).not.toBeInTheDocument();
    });

    it("redirects unauthenticated user to Login page when trying to access unknown route", () => {
        renderApp("/some-random-page");

        expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    });
});
