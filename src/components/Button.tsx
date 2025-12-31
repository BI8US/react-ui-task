import type { ButtonHTMLAttributes, ReactNode } from "react";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "selected";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    rounded?: boolean;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    to?: string;
}

export const Button = ({
    children,
    variant = "primary",
    rounded,
    isLoading = false,
    leftIcon,
    rightIcon,
    className = "",
    disabled,
    to,
    ...props
}: ButtonProps) => {
    const baseStyles =
        "inline-flex items-center justify-center px-4 py-2 font-medium transition-all" +
        "disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-text-secondary hover:bg-primary-hover",

        secondary: "bg-secondary text-text-main hover:bg-secondary-hover",

        danger: "bg-danger text-text-secondary hover:bg-danger-hover",

        ghost: "bg-transparent text-text-main hover:bg-secondary",

        selected: "bg-secondary text-text-main shadow-sm font-bold",
    };

    const content = (
        <>
            {isLoading ? (
                <CgSpinner className="animate-spin text-xl mr-2" />
            ) : (
                leftIcon && <span className="text-xl mr-2">{leftIcon}</span>
            )}
            {children}
            {!isLoading && rightIcon && <span className="text-xl ml-2">{rightIcon}</span>}
        </>
    );

    const classes = `${baseStyles} ${variants[variant]} ${rounded ? "rounded-full" : "rounded-lg"} ${className}`;

    if (to) {
        return (
            <Link to={to} className={classes}>
                {content}
            </Link>
        );
    }

    return (
        <button className={classes} disabled={disabled || isLoading} {...props}>
            {content}
        </button>
    );
};
