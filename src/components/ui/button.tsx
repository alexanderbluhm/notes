import React, { ButtonHTMLAttributes, JSXElementConstructor } from "react";
import { RefreshIcon } from "../icons";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  Component?: string | JSXElementConstructor<any>;
  variant?: "flat" | "slim" | "ghost";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

export const Button: React.FC<Props> = (props) => {
  const {
    variant = "flat",
    children,
    active,
    disabled,
    loading = false,
    Component = "button",
    ...rest
  } = props;

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      disabled={disabled}
      {...rest}
    >
      {!loading && children}
      {loading && <RefreshIcon className="w-6 h-6 animate-spin" />}
    </Component>
  );
};
