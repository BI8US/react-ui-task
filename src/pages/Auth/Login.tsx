import { useState } from "react";
import { MdArrowForward, MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { useTheme } from "../../context/ThemeContext.tsx";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const { TEXTS, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = { email: "", password: "" };
        let isValid = true;

        if (!formData.email.trim()) {
            newErrors.email = TEXTS.validation.emailRequired;
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = TEXTS.validation.emailInvalid;
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = TEXTS.validation.passwordRequired;
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = TEXTS.validation.passwordMinLength;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        setTimeout(() => {
            login();
            navigate("/");
        }, 800);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-background p-6">
            <div className="w-full max-w-sm">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-text-main mb-8">
                        {TEXTS.auth.companyName}
                    </h1>
                    <p className="text-text-main font-bold text-3xl mb-2">{TEXTS.auth.welcome}</p>
                    <div className="text-center font-semibold text-text-muted">
                        {TEXTS.auth.noAccount}{" "}
                        <Link to="/signup" className="text-primary-light hover:underline">
                            {TEXTS.auth.register}
                        </Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <Input
                        name="email"
                        label={TEXTS.auth.labels.email}
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <div className="space-y-1">
                        <Input
                            name="password"
                            label={TEXTS.auth.labels.password}
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-primary-light font-semibold hover:underline"
                            >
                                {TEXTS.auth.forgotPassword}
                            </Link>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            className="w-full text-lg"
                            isLoading={isLoading}
                            rounded
                            rightIcon={<MdArrowForward />}
                        >
                            {TEXTS.auth.login}
                        </Button>
                    </div>
                </form>
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
