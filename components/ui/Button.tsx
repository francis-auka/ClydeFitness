import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-green text-black hover:bg-green-dim font-bold",
      outline: "border border-white/20 text-white hover:border-green",
      ghost: "bg-transparent text-white hover:bg-white/10",
      danger: "bg-red text-white hover:bg-red/80",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-[13px]",
      lg: "px-8 py-4 text-sm",
      full: "w-full py-4 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center uppercase tracking-widest transition-colors duration-200 active:scale-[0.97] font-barlow disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
