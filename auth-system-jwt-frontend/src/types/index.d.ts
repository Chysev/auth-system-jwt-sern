import { ButtonHTMLAttributes, ReactNode, ChangeEvent } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

type LoginState = {
  email: string;
  password: string;
};

type RegisterState = {
  user: {
    name: string;
    avatarUrl: File | null;
  };
  email: string;
  password: string;
};

type InputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  value?: any;
};
