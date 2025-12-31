import { useState } from "react";
import { MdArrowBack, MdCheckCircle, MdDarkMode, MdLightMode, MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";

import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

export default function ForgotPassword() {
    const { TEXTS, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        if (!email.trim()) {
            setError(TEXTS.validation.emailRequired);
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError(TEXTS.validation.emailInvalid);
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validate()) return;

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-background p-6">
            <div className="w-full max-w-[360px]">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-text-main mb-4">
                        {isSubmitted ? TEXTS.auth.emailSent : TEXTS.auth.resetPassword}
                    </h1>
                    <p className="text-text-muted">
                        {isSubmitted ? TEXTS.auth.resetSuccess : TEXTS.auth.resetDesc}
                    </p>
                </div>

                {isSubmitted ? (
                    <div className="animate-fade-in flex flex-col items-center">
                        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-8 text-success text-5xl">
                            <MdCheckCircle />
                        </div>
                        <Button to="/login" rounded className="w-full">
                            {TEXTS.auth.backToLogin}
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in" noValidate>
                        <Input
                            label={TEXTS.auth.labels.email}
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                            }}
                            error={error}
                            placeholder="name@example.com"
                        />

                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="w-full text-lg"
                                isLoading={isLoading}
                                rounded
                                rightIcon={<MdMailOutline />}
                            >
                                {TEXTS.auth.sendResetLink}
                            </Button>
                        </div>

                        <div className="text-center mt-4">
                            <Link
                                to="/login"
                                className="inline-flex items-center text-text-muted hover:text-text-main font-medium transition-colors"
                            >
                                <MdArrowBack className="mr-2" />
                                {TEXTS.auth.backToLogin}
                            </Link>
                        </div>
                    </form>
                )}
            </div>

            <div className="flex items-center gap-4 animate-fade-in mt-12">
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
                    className="w-10 h-10 !p-0 text-xl"
                >
                    {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
                </Button>
            </div>
        </div>
    );
}
