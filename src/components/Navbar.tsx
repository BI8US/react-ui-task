import { MdDarkMode, MdHome, MdLightMode, MdOutlineLogout } from "react-icons/md";
import { useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useTheme } from "../context/ThemeContext.tsx";
import { Button } from "./Button.tsx";

export default function Navbar() {
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { TEXTS, toggleLanguage, language } = useLanguage();
    const location = useLocation();

    const getVariant = (path: string) => {
        return location.pathname === path ? "selected" : "ghost";
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border h-16">
            <div className="container mx-auto px-6 h-full flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-extrabold tracking-tight text-text-main select-none">
                        {TEXTS.nav.logo}
                    </h1>

                    <div className="hidden md:flex items-center gap-2 ml-4">
                        <Button
                            to="/"
                            variant={getVariant("/")}
                            leftIcon={<MdHome />}
                            rounded
                            className="text-sm h-10 px-5"
                        >
                            {TEXTS.nav.home}
                        </Button>

                        <Button
                            to="/coin"
                            variant={getVariant("/coin")}
                            rounded
                            className="text-sm h-10 px-5"
                        >
                            {TEXTS.nav.coin}
                        </Button>

                        <Button
                            to="/snake"
                            variant={getVariant("/snake")}
                            rounded
                            className="text-sm h-10 px-5"
                        >
                            {TEXTS.nav.snake}
                        </Button>

                        <Button
                            to="/wheel"
                            variant={getVariant("/wheel")}
                            rounded
                            className="text-sm h-10 px-5"
                        >
                            {TEXTS.nav.wheel}
                        </Button>
                    </div>
                </div>

                <div className="flex items-center md:gap-2">
                    <Button
                        onClick={toggleLanguage}
                        variant="ghost"
                        rounded
                        className="w-10 h-10 !p-0 font-bold text-sm"
                    >
                        {language.toUpperCase()}
                    </Button>

                    <Button
                        onClick={toggleTheme}
                        variant="ghost"
                        rounded
                        className="w-10 h-10 !p-0 flex items-center justify-center text-2xl"
                    >
                        {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
                    </Button>

                    <div className="h-6 w-px bg-border mx-1"></div>

                    <Button
                        onClick={logout}
                        variant="ghost"
                        rounded
                        className="text-danger hover:bg-danger/10 hover:text-danger"
                        rightIcon={<MdOutlineLogout />}
                    >
                        {TEXTS.nav.logout}
                    </Button>
                </div>
            </div>
        </nav>
    );
}
