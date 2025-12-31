import { forwardRef, type InputHTMLAttributes, type ReactNode, useState } from "react";
import { MdError, MdVisibility, MdVisibilityOff } from "react-icons/md";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    rounded?: boolean;
    error?: string;
    leftIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, rounded, error, leftIcon, type = "text", className = "", ...props }, ref) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const isPasswordType = type === "password";

        const inputType = isPasswordType ? (isPasswordVisible ? "text" : "password") : type;

        const togglePasswordVisibility = () => {
            setIsPasswordVisible((prev) => !prev);
        };

        const paddingLeftClass = leftIcon ? "pl-10" : "pl-3";

        const hasDoubleIcon = error && isPasswordType;
        const hasSingleIcon = error || isPasswordType;
        const paddingRightClass = hasDoubleIcon ? "pr-20" : hasSingleIcon ? "pr-10" : "pr-3";

        return (
            <div className="w-full">
                {label && <label className="block font-medium text-text-main mb-1">{label}</label>}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                            <span className="text-xl">{leftIcon}</span>
                        </div>
                    )}

                    <input
                        ref={ref}
                        type={inputType}
                        className={`
                            w-full py-2
                            ${paddingLeftClass}
                            ${paddingRightClass}
                            
                            text-text-main text-lg 
                            focus:bg-background
                            ${
                                error
                                    ? "outline-none ring-2 ring-danger caret-danger bg-background"
                                    : "focus:outline-none focus:ring-2 focus:ring-primary caret-primary bg-secondary"
                            }
                            ${rounded ? "rounded-full" : "rounded-lg"}
                            ${className}
                        `}
                        {...props}
                    />

                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                        {error && <MdError className="text-danger text-xl" title={error} />}

                        {isPasswordType && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="flex items-center text-text-muted hover:text-text-main focus:outline-none"
                                tabIndex={-1}
                            >
                                {isPasswordVisible ? (
                                    <MdVisibilityOff className="text-xl" />
                                ) : (
                                    <MdVisibility className="text-xl" />
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {error && <p className="mt-1 text-red-600">{error}</p>}
            </div>
        );
    },
);
export default Input;

Input.displayName = "Input";
