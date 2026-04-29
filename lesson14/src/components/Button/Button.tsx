import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

const Button = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  const baseStyle = {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "14px",
  };

  const variants = {
    primary: {
      backgroundColor: "#4f46e5",
      color: "white",
    },
    secondary: {
      backgroundColor: "#e5e7eb",
      color: "#111827",
    },
  };

  const style = {
    ...baseStyle,
    ...variants[variant],
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button onClick={onClick} disabled={disabled} style={style}>
      {label}
    </button>
  );
};

export default Button;