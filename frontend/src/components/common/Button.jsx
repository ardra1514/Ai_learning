import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  size = "md",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded";

 const variantStyles = {
  primary:
    "bg-gradient-to-r from-[#0C7075] to-[#0F969C] text-white shadow-lg hover:opacity-90",

  secondary:
    "bg-[#6DA5C0] text-white hover:bg-[#294D61]",

  outline:
    "bg-white border-2 border-[#0F969C] text-[#0C7075] hover:bg-[#F8FAFC]",
};

  const sizeStyles = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-5 text-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;