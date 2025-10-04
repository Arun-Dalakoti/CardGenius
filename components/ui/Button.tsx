import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`rounded-full text-white text-center ${fullWidth ? "w-full" : ""} ${className}`}
      style={{
        fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "20px",
        background: "rgba(30, 87, 82, 1)",
        border: "0.25px solid transparent",
        borderImage:
          "linear-gradient(309.27deg, #FFFFFF 4.34%, rgba(255, 255, 255, 0.1) 51.19%), linear-gradient(110.91deg, #FFFFFF 3.75%, rgba(255, 255, 255, 0.1) 34.54%)",
        borderImageSlice: 1,
        boxShadow:
          "-4px -4px 5.8px 0px rgba(8, 33, 25, 0.15) inset, 3px 4px 5.8px 0px rgba(255, 255, 255, 0.15) inset",
        padding: "12px 20px",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
