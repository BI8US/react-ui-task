import { useState } from "react";
import { MdArrowForward, MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { useTheme } from "../../context/ThemeContext.tsx";

export default function Signup() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const { TEXTS, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        const newErrors = { name: "", email: "", password: "", confirmPassword: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = TEXTS.validation.nameRequired;
            isValid = false;
        }

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

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = TEXTS.validation.passwordsDoNotMatch;
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
            <div className="w-full max-w-[360px]">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-text-main mb-8">
                        {TEXTS.auth.companyName}
                    </h1>
                    <div className="text-center font-semibold text-text-muted">
                        {TEXTS.auth.alreadyHaveAccount}{" "}
                        <Link to="/login" className="text-primary-light hover:underline">
                            {TEXTS.auth.signIn}
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <Input
                        name="name"
                        label={TEXTS.auth.labels.name}
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />

                    <Input
                        name="email"
                        label={TEXTS.auth.labels.email}
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <div className="space-y-5">
                        <Input
                            name="password"
                            label={TEXTS.auth.labels.password}
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                        />

                        <Input
                            name="confirmPassword"
                            label={TEXTS.auth.labels.confirmPassword}
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                        />
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full text-lg"
                            isLoading={isLoading}
                            rounded
                            rightIcon={<MdArrowForward />}
                        >
                            {TEXTS.auth.createAccount}
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
