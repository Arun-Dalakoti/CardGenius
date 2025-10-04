import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  fullWidth = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`text-white text-center text-button-md cursor-pointer ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      style={{
        height: "54px",
        borderRadius: "14px",
        padding: "16px 20px",
        background: "#1E5752",
        border: "0.25px solid",
        borderImageSource:
          "linear-gradient(309.27deg, #FFFFFF 4.34%, rgba(255, 255, 255, 0.1) 51.19%), linear-gradient(110.91deg, #FFFFFF 3.75%, rgba(255, 255, 255, 0.1) 34.54%)",
        borderImageSlice: 1,
        boxShadow:
          "-4px -4px 5.8px 0px #08211926 inset, 3px 4px 5.8px 0px #FFFFFF26 inset",
        ...(fullWidth ? {} : { width: "336px" }),
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
